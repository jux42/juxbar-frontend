import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, of, switchMap} from "rxjs";
import {SoftDrink} from "../models/softDrink";
import {environment} from "../../../environments/environment";
import {take} from "rxjs/operators";
import {AuthService} from "../login/auth-service";

@Injectable({
  providedIn: 'root'

})

export class SoftDrinkService {

  constructor(private http: HttpClient, private authService : AuthService) {
  }

  getAllSoftDrinks(): Observable<SoftDrink[]> {

    return this.http.get<SoftDrink[]>(`http://${environment.apiUrl}/softdrinks`)
  }

  getOneSoftDrinkById(id: number): Observable<SoftDrink> {

    return this.http.get<SoftDrink>(`http://${environment.apiUrl}/softdrink/${id}`);

  }

  getSoftDrinkByIngredient(ingredient: string): Observable<SoftDrink[]>{

    return this.http.get<SoftDrink[]>(`http://${environment.apiUrl}/softdrinks`).pipe(
      map(softDrinks   => softDrinks.filter(softDrink=>
        Object.values(softDrink).slice(0, 12).includes(ingredient) ||
        Object.values(softDrink).slice(0, 12).includes(ingredient.replace(/\b\w/g, first => first.toLocaleUpperCase())) ||
        Object.values(softDrink).slice(0, 12).includes(ingredient.toLowerCase)))
    );
  }

  getFavouriteSoftDrinks(): Observable<SoftDrink[]> {
    return this.authService.getUsername().pipe(
      take(1),
      switchMap(username => {
        if (username) {
          const url = `http://${environment.apiUrl}/user/favouritesoftdrinks`;
          return this.http.get<SoftDrink[]>(url);
        } else
          return of([]);
      })
    );
  }
}
