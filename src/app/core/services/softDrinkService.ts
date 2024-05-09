import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {SoftDrink} from "../models/softDrink";
import {environment} from "../../../environments/environment";
import {UserRequest} from "../models/UserRequest";

@Injectable({
  providedIn: 'root'

})

export class SoftDrinkService {

  constructor(private http: HttpClient) {
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

  getFavouriteSoftDrinks(username: string): Observable<SoftDrink[]> {
    const url: string = `http://${environment.apiUrl}/favouritesoftdrinks`;
    const userRequest = new UserRequest(username);
    return this.http.post<SoftDrink[]>(url, userRequest);

  }
}
