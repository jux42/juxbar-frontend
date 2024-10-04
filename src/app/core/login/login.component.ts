import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthRequest, AuthService} from './auth-service';
import {FormsModule} from "@angular/forms";
import {AsyncPipe, NgIf} from "@angular/common";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    AsyncPipe,
    ForgotPasswordComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: AuthRequest = {username: '', password: ''};
  message: string = '';
  forgotPasswordVisible: boolean = false;

  constructor(protected authService: AuthService, private router: Router, private route: ActivatedRoute) {
    console.log('Constructor: credentials', this.credentials);
  }


  ngOnInit() {

    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });

    console.log('OnInit: credentials', this.credentials);
    this.route.queryParams.subscribe(params => {
      if (params['authRequired']) {
        console.log('TEST' + this.message);
        this.message = 'You need to login first';
      }
    });
  }


  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        if (this.credentials.username == 'admin' || this.credentials.username == 'superadmin') {
          this.router.navigate(['juxbar/admin']);
        } else {
          this.router.navigate(['juxbar/profile']);
        }
      },
      error: error => {
        this.message = error.message || 'Échec de la connexion, vérifiez votre nom d’utilisateur/mot de passe';
        console.error('Login error', error);
      }
    });
  }

  logout(): void {

    this.authService.logout();

  }

  onCreateAccount(): void {
    this.router.navigate(['juxbar/register']);
  }

  toggleForgotPasswordForm(): void {
    this.forgotPasswordVisible = !this.forgotPasswordVisible;
  }


}


