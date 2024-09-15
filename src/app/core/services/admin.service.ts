import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {JuxbarUser} from "../models/juxbar-user";
import {of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }


  createUser(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return username.length < 3 ? of("username must contain at least 3 characters")
      : password.length < 6 ? of("password must contain at least 6 characters")
        : this.http.post(`http://${environment.apiUrl}/admin/user`, params, {responseType: 'text' as 'json'});
  }


  listUsers() {
    return this.http.get<JuxbarUser[]>(`http://${environment.apiUrl}/admin/users`).pipe(
      tap(users => console.log("API Response:", users))
    );
  }

  changePassword(username: string, newPassword: string) {
    const params = new HttpParams().set('newPassword', newPassword);
    return newPassword.length < 6 ? of("password must contain at least 6 characters")
      :this.http.put<string>(`http://${environment.apiUrl}/admin/userpassword/${username}`, params, {responseType: 'text' as 'json'});
  }

  reactivateUser(username: string) {
    return this.http.get(`http://${environment.apiUrl}/admin/reactivate/${username}`, {responseType: 'text' as 'json'});
  }

  deactivate(username: string) {
    return this.http.get(`http://${environment.apiUrl}/admin/disable/${username}`, {responseType: 'text' as 'json'});
  }

  restorePersonalCocktail(username: string, id:number){
    console.log(id);
    return this.http.get(`http://${environment.apiUrl}/admin/untrash/${username}/${id}`, {responseType: 'text' as 'json'});
  }
}
