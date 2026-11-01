import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { AuthService } from './auth.service';

@Component({
  imports: [RouterOutlet, RouterLink, KENDO_BUTTON],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  constructor(public authService: AuthService) {}
}
