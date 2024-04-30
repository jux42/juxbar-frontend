import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthRequest } from './auth-service';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  credentials: AuthRequest = {username: '', password: ''};


  constructor(protected authService: AuthService, private router: Router) {
    console.log('Constructor: credentials', this.credentials);
  }

  ngOnInit() {
    console.log('OnInit: credentials', this.credentials);

  }


  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.authService.setLoggedIn(true);
        this.router.navigate(['/']); // Naviguer vers la page d'accueil après la connexion
      },
      error: (error: any) => {
        console.error('Login failed', error);
      }
    });
  }



  logout(): void {

    this.authService.logout();
  }
}
