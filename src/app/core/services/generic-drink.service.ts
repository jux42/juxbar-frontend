import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, of, switchMap, tap} from "rxjs";
import { environment } from "../../../environments/environment";
import {map, take} from "rxjs/operators";
import {AuthService} from "../login/auth-service";
import {Cocktail} from "../models/cocktail";

@Injectable({
  providedIn: 'root'
})
export class GenericDrinkService<T> {

  constructor(protected http: HttpClient, protected authService: AuthService) {}

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${endpoint}`);
  }

  getOneById(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/${endpoint}/${id}`);
  }

  getPaginated(endpoint: string, page: number = 0, limit: number = 10): Observable<T[]> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(limit));
    return this.http.get<T[]>(`${environment.apiUrl}/${endpoint}`, { params });
  }

  addFavorite(endpoint: string, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${endpoint}/${id}`,{}, {responseType:'text' as 'json'});
  }

  getFavourite(endpoint: string): Observable<any> {
    return this.authService.getUsername().pipe(
      take(1),
      switchMap(username => {
        if (username) {
          const url = `${environment.apiUrl}/user/${endpoint}`;
          return this.http.get<Cocktail[]>(url).pipe(
            tap(favCocktails => {
              if (endpoint == 'user/favouritecocktails'){
                sessionStorage.setItem("favouritecocktails", JSON.stringify(favCocktails));

              }else if(endpoint == 'user/favouritesoftdrinks'){
                sessionStorage.setItem("favouritesoftdrinks", JSON.stringify(favCocktails));
              }
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }

  removeFavorite(endpoint: string, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${endpoint}/${id}`, {}, {responseType:'text' as 'json'}).pipe();
  }

  getByIngredient(endpoint: string, ingredient: string): Observable<T[]> {
    return this.http.get<T[]>(`${environment.apiUrl}/${endpoint}`).pipe(
      map(items => items.filter((item: T) =>
        Object.values(item as { [key: string]: unknown }).slice(0, 12).includes(ingredient) ||
        Object.values(item as { [key: string]: unknown }).slice(0, 12).includes(ingredient.toLowerCase())
      ))
    );
  }

}
