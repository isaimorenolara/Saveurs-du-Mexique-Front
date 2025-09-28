import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../shared/models/auth'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = `${environment.backendUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest) {
    return this.http.post<{ response: RegisterResponse }>(`${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest){
    return this.http.post<{ response: LoginResponse }>(`${this.apiUrl}/login`, request);
  }
}
