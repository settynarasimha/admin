import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logclass } from './logclass';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LogserviceService {
  private baseUrl="http://localhost:8080/user2";
  constructor(private httpClient:HttpClient) { }
  loginUser(logo:Logclass):Observable<Object>{
        console.log(logo);
        return this.httpClient.get(`${this.baseUrl}`);
  }
}
