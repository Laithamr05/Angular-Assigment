import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_TEXTBOX } from '@progress/kendo-angular-inputs';
import { AuthService } from './auth.service';

@Component({
  imports: [RouterOutlet, RouterLink, FormsModule, KENDO_BUTTON, KENDO_TEXTBOX],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  username = '';
  password = '';
  errorMessage = '';

  constructor(public authService: AuthService) {}

  login() {
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.password = '';
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Wrong username or password';
        } else {
          this.errorMessage = 'Login failed';
        }
      },
    });
  }

  signup() {
    this.errorMessage = '';
    this.authService.signup(this.username, this.password).subscribe({
      next: () => {
        this.password = '';
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMessage = 'Username is already taken';
        } else if (error.status === 400) {
          this.errorMessage = 'Username needs 3+ characters, password needs 8+';
        } else {
          this.errorMessage = 'Sign up failed';
        }
      },
    });
  }
}
