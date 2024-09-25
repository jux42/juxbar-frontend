import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, of, switchMap, tap} from "rxjs";
import {SoftDrink} from "../models/softDrink";
import {environment} from "../../../environments/environment";
import {take} from "rxjs/operators";
import {AuthService} from "../login/auth-service";

@Injectable({
  providedIn: 'root'

})

export class SoftDrinkService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllSoftDrinks(): Observable<SoftDrink[]> {

    return this.http.get<SoftDrink[]>(`${environment.apiUrl}/softdrinks`)
  }

  getOneSoftDrinkById(id: number): Observable<SoftDrink> {

    return this.http.get<SoftDrink>(`${environment.apiUrl}/softdrink/${id}`);

  }

  getSoftDrinksArraySize(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/softdrinks/arraysize`);
  }

  getSoftDrinkByIngredient(ingredient: string): Observable<SoftDrink[]> {

    return this.http.get<SoftDrink[]>(`${environment.apiUrl}/softdrinks`).pipe(
      map(softDrinks => softDrinks.filter(softDrink =>
        Object.values(softDrink).slice(0, 12).includes(ingredient) ||
        Object.values(softDrink).slice(0, 12).includes(ingredient.replace(/\b\w{3,}\b/g, word =>
          word.replace(/^\w/, first => first.toLocaleUpperCase()))) ||
        Object.values(softDrink).slice(0, 12).includes(ingredient.toLowerCase)))
    );
  }

  getFavouriteSoftDrinks(): Observable<SoftDrink[]> {
    return this.authService.getUsername().pipe(
      take(1),
      switchMap(username => {
        if (username) {
          const url = `${environment.apiUrl}/user/favouritesoftdrinks`;
          return this.http.get<SoftDrink[]>(url).pipe(
            tap(favDrinks => {
              sessionStorage.setItem("favouritesoftdrinks", JSON.stringify(favDrinks));
            })
          );
        } else
          return of([]);
      })
    );
  }

  addFavouriteSoftDrink(id: number): Observable<String> {
    const url = `${environment.apiUrl}/user/favouritesoftdrink/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }

  removeFavouriteCocktail(id: number): Observable<String> {
    const url = `${environment.apiUrl}/user/rmfavouritesoftdrink/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }

}
