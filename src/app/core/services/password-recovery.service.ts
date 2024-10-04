import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(private http: HttpClient) { }

  recoverPassword(username: string, secretQuestion: string, secretAnswer: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams({
      'secretQuestion': secretQuestion,
      'secretAnswer': secretAnswer,
      'password': password
    });

    console.log("in the service")
    return this.http.post<string>(`${environment.apiUrl}/recover/${username}`, body.toString(), { headers , responseType: 'text' as 'json'});
  }
}
