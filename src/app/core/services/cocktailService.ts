import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Cocktail} from "../models/cocktail";
import {GenericDrinkService} from "./generic-drink.service";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {AuthService} from "../login/auth-service";
import {SoftDrink} from "../models/softDrink";

@Injectable({
  providedIn: 'root'

})

export class CocktailService extends GenericDrinkService<Cocktail> {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getCocktailsArraySize():Observable<number>{
    return this.http.get<number>(`${environment.apiUrl}/cocktails/arraysize`);
  }
  getCocktailOfTheDay(maxId: number): number {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return this.pseudoRandomNumber(seed, 1, maxId);
  }

  private pseudoRandomNumber(seed: number, min: number, max: number): number {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
  }

  getFavouriteCocktails(): Observable<SoftDrink[]> {
    return this.http.get<Cocktail[]>(`${environment.apiUrl}/user/favouritecocktails`);
  }

  addFavouriteCocktail(id: number): Observable<String> {
    return this.addFavorite('user/favouritecocktail', id);
  }

  removeFavouriteCocktail(id: number): Observable<String> {
    return this.removeFavorite('user/rmfavouritecocktail', id);
  }
}
