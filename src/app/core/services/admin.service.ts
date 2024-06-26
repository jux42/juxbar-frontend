import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }




  createUser(username: string, password: string) {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post(`http://${environment.apiUrl}/admin/user`, params, { responseType: 'text' as 'json' });
  }


listUsers() {
    return this.http.get<string>(`http://${environment.apiUrl}/admin/users`)
  }

}
