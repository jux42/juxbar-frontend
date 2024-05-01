import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from "@angular/router";

export interface AuthRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login';

  username = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));
  loggedIn = new BehaviorSubject<boolean>(sessionStorage.getItem('isAuthenticated') === 'true');



  constructor(private http: HttpClient, private router: Router) {}

  setLoginState(isAuthenticated: boolean) {
    this.loggedIn.next(isAuthenticated);
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());

  }

  login(credentials: any): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log('Login successful, setting username:', credentials.username);
    this.setLoginState(true)
    this.loggedIn.next(true);
    sessionStorage.setItem('username', credentials.username);
    this.username.next(credentials.username)


    // Assurez-vous que cette méthode retourne un Observable
    return this.http.post(this.loginUrl, body.toString(), { headers, withCredentials: true, responseType: 'text' as 'json' });
  }



  getUsername(): Observable<string | null> {
    return this.username.asObservable();
  }



  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  logout(): void {
    this.setLoginState(false)
    this.username.next('')
    this.router.navigate(['/login']);
  }
}
