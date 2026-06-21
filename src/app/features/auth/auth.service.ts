import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/auth.models';
import { RegisterRequest, RegisterResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error("Credenciales incorrectas");
        }
        return throwError(() => error);
      })
    );
  }


register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, request, { responseType: 'text' }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }}