import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(localStorage.getItem('loggedIn') === 'true');

  login() {
    localStorage.setItem('loggedIn', 'true');
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.isLoggedIn.set(false);
  }
}
