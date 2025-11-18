import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root',
})
export class AuthService {
 // Base URL includes the protocol, host, port, and API prefix
baseUrl = 'http://localhost:5000/api'; 

constructor(private http: HttpClient) { 

 }

 // Registration endpoint: POST http://localhost:5000/api/register
 register(sudipto: any): Observable<any> {
 return this.http.post(`${this.baseUrl}/register`, sudipto);
  }

// Login endpoint: POST http://localhost:5000/api/login
 login(credentials: any): Observable<any> {
// The full URL is constructed here using the baseUrl
 return this.http.post(`${this.baseUrl}/login`, credentials); 
}
}