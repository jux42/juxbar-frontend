import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SoftDrink} from "../models/softDrink";
import {GenericDrinkService} from "./generic-drink.service";
import {Observable, of, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {take} from "rxjs/operators";
import {AuthService} from "../login/auth-service";

@Injectable({
  providedIn: 'root'
})
export class SoftDrinkService extends GenericDrinkService<SoftDrink> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getSoftDrinksArraySize(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/softdrinks/arraysize`);
  }

  getSoftDrinkByIngredient(ingredient: string): Observable<SoftDrink[]> {
    return this.getByIngredient('softdrinks', ingredient);
  }


  addFavouriteSoftDrink(id: number): Observable<String> {
    return this.addFavorite('user/favouritesoftdrink', id);
  }

  removeFavouriteSoftDrink(id: number): Observable<String> {
    return this.removeFavorite('user/rmfavouritesoftdrink', id);
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
}
