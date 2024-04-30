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
  private loginUrl = 'http://localhost:8080/login'; // Assurez-vous que l'URL est correcte

  private username = new BehaviorSubject<string>('');
  loggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log('Login successful, setting username:', credentials.username);
    this.loggedIn.next(true);
    this.setUsername(credentials.username);
    // Assurez-vous que cette méthode retourne un Observable
    return this.http.post(this.loginUrl, body.toString(), { headers, withCredentials: true, responseType: 'text' as 'json' });
  }



  getUsername(): Observable<string> {
    return this.username.asObservable();
  }
  setUsername(name: string): void {
    this.username.next(name);
  }


  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  logout(): void {
    this.loggedIn.next(false);
    this.setUsername('');
    this.router.navigate(['/login']);
  }
}
