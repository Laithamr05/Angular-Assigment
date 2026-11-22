import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = signal(localStorage.getItem('token'));
  isLoggedIn = computed(() => this.token() !== null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>('/api/auth/login', { username, password })
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  signup(username: string, password: string) {
    return this.http
      .post<AuthResponse>('/api/auth/signup', { username, password })
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }
}
