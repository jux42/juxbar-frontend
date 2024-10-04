import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {JuxbarUser} from "../models/juxbar-user";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private juxbarUserSubject = new BehaviorSubject<JuxbarUser | null>(null);


  constructor(private http: HttpClient) {
  }

  getUser() {

    return this.http.get<JuxbarUser>(`${environment.apiUrl}/user/details`);

  }

  checkTextSecurity(text: string) {
    const formData = new FormData();
    formData.append('aboutMe', text);
    return this.http.post<boolean>(`${environment.apiUrl}/user/aboutme/securize`, formData);
  }

  updateAboutMeText(aboutMeText: string): Observable<any> {
    const formData = new FormData();
    formData.append('aboutMe', aboutMeText);
    return this.http.post(`${environment.apiUrl}/user/aboutme`, formData, {responseType: 'text'});
  }

  updateProfilePicture(blob: Blob): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/picture`, blob, {
      headers: {'Content-Type': 'application/octet-stream'},
      responseType: 'text'
    });
  }


  getProfilPicture() {
    return this.http.get(`${environment.apiUrl}/user/mypicture`, {responseType: 'arraybuffer'});
  }

  deleteAccount(username: string) {
    return this.http.delete<string>(`${environment.apiUrl}/user/${username}`, {responseType: "text" as 'json'});
  }

  changePassword(username: string | null, newPassword: string) {
    if (username == null) {
      return of("you are not authenticated");
    }
    const params = new HttpParams().set('newPassword', newPassword);
    return newPassword.length < 6 ? of("password must contain at least 6 characters")
      : this.http.put<string>(`${environment.apiUrl}/user/${username}/password`, params, {responseType: 'text' as 'json'});
  }

  createAccount(username: string, secretQuestion: string, secretAnswer: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('username', username)
      .set('secretQuestion', secretQuestion)
      .set('secretAnswer', secretAnswer)
      .set('password', password);

    return this.http.post(`${environment.apiUrl}/register`, null, {params, responseType: 'text'});
  }

}
