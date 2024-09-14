import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of, tap, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {Cocktail} from "../models/cocktail";
import {SoftDrink} from "../models/softDrink";

export interface AuthRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  favCocktailsList = new BehaviorSubject<Cocktail[]>([]);
  favSoftDrinksList: BehaviorSubject<SoftDrink[]> = new BehaviorSubject<SoftDrink[]>([]);
  username = new BehaviorSubject<string | null>(sessionStorage.getItem('username'));
  loggedIn = new BehaviorSubject<boolean>(sessionStorage.getItem('isAuthenticated') === 'true');
  private loginUrl = 'http://localhost:8080/login';
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(credentials: { username: string; password: string }): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new URLSearchParams(credentials);

    return this.http.post<string>(this.loginUrl, body.toString(), {headers, responseType: 'text' as 'json'})
      .pipe(
        tap(token => {
          this.storeToken(token);
          this.setAuthState(true, credentials.username);
        }),
        catchError(error => {
          const errorMessage = error.error || 'Login failed';
          this.setAuthState(false, null);
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  private storeToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
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

  isAdmin$(): Observable<boolean> {
    const username = sessionStorage.getItem('username');
    return of(username === 'admin');
  }

  logout(): void {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('favouritecocktails')
    sessionStorage.removeItem('favouritesoftdrinks');
    this.setAuthState(false, null);
    this.router.navigate(['/']);
  }

  private setAuthState(isAuthenticated: boolean, username: string | null): void {

    this.loggedIn.next(isAuthenticated);
    this.username.next(username);
    this.favCocktailsList.next(this.favCocktailsList.value);
    this.favSoftDrinksList.next(this.favSoftDrinksList.value);
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (username) {
      sessionStorage.setItem('username', username);
      console.log(sessionStorage)
    } else {
      sessionStorage.removeItem('username');
    }

  }
}
