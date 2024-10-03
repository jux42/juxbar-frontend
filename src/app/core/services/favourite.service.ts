import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../login/auth-service";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private favouriteRemovedSource = new Subject<{ id: number, type: string }>();
  favouriteRemoved$ = this.favouriteRemovedSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  announceFavouriteRemoved(id: number, type: string) {
    this.favouriteRemovedSource.next({id, type});
  }


  addFavouriteDrink(id: number, drinkType: string): Observable<String> {
    const url = `${environment.apiUrl}/user/favouritecocktail/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }

  removeFavouriteDrink(id: number, drinkType: string): Observable<String> {
    const url = `${environment.apiUrl}/user/rmfavouritecocktail/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }

}
