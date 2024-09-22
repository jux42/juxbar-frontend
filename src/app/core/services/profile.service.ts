import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "../models/ingredient";
import {environment} from "../../../environments/environment";
import {JuxbarUser} from "../models/juxbar-user";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private juxbarUserSubject = new BehaviorSubject<JuxbarUser | null>(null);


  constructor(private http: HttpClient) {}

  getUser(){

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
    return this.http.post(`${environment.apiUrl}/user/aboutme`, formData, { responseType: 'text' });
  }

  updateProfilePicture(blob: Blob): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/picture`, blob, {
      headers: { 'Content-Type': 'application/octet-stream' },
      responseType: 'text'
    });
  }


  getProfilPicture() {
    return this.http.get(`${environment.apiUrl}/user/mypicture`,{ responseType: 'arraybuffer' });
  }

}
