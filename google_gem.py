from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
import google.generativeai as genai
import os
from dotenv import load_dotenv


load_dotenv()


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))



app = FastAPI(
    title="Google Ads & Gemini AI Agent API",
    description="API to retrieve keyword data directly or via a Gemini AI assistant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


try:
    client = GoogleAdsClient.load_from_storage("google-ads.yaml")
    print("Google Ads client loaded successfully.")
except Exception as e:
    print(f"Failed to load Google Ads configuration: {e}")
    raise


def fetch_keyword_data(keyword: str) -> list:
    """Core function to fetch Google Ads monthly search volume and competition data."""
    customer_id = "8615470078"
    try:
        keyword_service = client.get_service("KeywordPlanIdeaService")
        google_ads_service = client.get_service("GoogleAdsService")
        
        language_id = "1000"
        location_id = "2356"
        
        google_request = client.get_type("GenerateKeywordIdeasRequest")
        google_request.customer_id = customer_id
        google_request.language = google_ads_service.language_constant_path(language_id)
        google_request.geo_target_constants.append(google_ads_service.geo_target_constant_path(location_id))
        google_request.keyword_plan_network = client.enums.KeywordPlanNetworkEnum.GOOGLE_SEARCH
        google_request.keyword_seed.keywords.append(keyword)
        
        response = keyword_service.generate_keyword_ideas(request=google_request)
        
        results = []
        for idea in response:
            metrics = idea.keyword_idea_metrics
            results.append({
                "keyword": idea.text,
                "monthly_searches": metrics.avg_monthly_searches,
                "competition": metrics.competition.name
            })
        return results
    except Exception as e:
        raise Exception(f"Failed to fetch data: {str(e)}")


class KeywordRequest(BaseModel):
    keyword: str

@app.post("/keyword-volume")
def keyword_volume(request: KeywordRequest):
    keyword = request.keyword.strip()
    if not keyword:
        raise HTTPException(status_code=400, detail="Keyword cannot be empty.")
    
    try:
        results = fetch_keyword_data(keyword)
        return {
            "keyword": keyword,
            "results": results
        }
    except GoogleAdsException as ex:
        print(f"Google Ads API Error: {ex}")
        raise HTTPException(status_code=400, detail=f"Google Ads API Error: {ex.failure}")
    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


def get_keyword_search_volume(keyword: str) -> list:
    """Fetches Google Ads monthly search volume and competition data for a given keyword."""
    try:
        results = fetch_keyword_data(keyword)
        return results[:10] 
    except Exception as e:
        return [{"error": str(e)}]


model = genai.GenerativeModel(
    model_name='gemini-2.5-flash',
    tools=[get_keyword_search_volume]
)

class ChatRequest(BaseModel):
    prompt: str

@app.post("/ask-ai")
def ask_ai(request: ChatRequest):
    try:
        chat = model.start_chat(enable_automatic_function_calling=True)
        response = chat.send_message(request.prompt)
        
        return {
            "prompt": request.prompt,
            "ai_response": response.text
        }
    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))