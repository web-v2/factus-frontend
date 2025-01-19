import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private sessionKey: string = 'access_token';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      grant_type: 'password',
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      username: email,
      password,
    };

    return this.http.post(`${this.apiUrl}/oauth/token`, body).pipe(
      tap((response: any) => {
        localStorage.setItem('userSession', email);
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('expires_at', response.expires_in);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userSession');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.sessionKey);
  }

  isTokenExpired(): boolean {
    console.log('revision token');
    const token = localStorage.getItem('access_token');
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(new Date().getTime() / 1000);

    return payload.exp < currentTime;
  }

  refreshToken(): Observable<void> {
    console.log('refresh token OK');
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const body = {
      refresh_token: refreshToken,
      client_id: environment.clientId,
      client_secret: environment.clientSecret,
      grant_type: 'refresh_token',
    };

    return this.http.post(`${this.apiUrl}/oauth/token`, body).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('expires_at', response.expires_in);
      })
    );
  }
}
