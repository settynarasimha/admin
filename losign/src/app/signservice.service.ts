import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signclass } from './signclass';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SignserviceService {
 private baseUrl="http://localhost:8080/user/sign";
  constructor(private httpClient:HttpClient) { }
  loginUser(sign:Signclass):Observable<Object>{
    
        return this.httpClient.post(`${this.baseUrl}`,sign);
      }
}
