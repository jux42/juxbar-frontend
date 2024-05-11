import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, of, switchMap} from "rxjs";
import {Cocktail} from "../models/cocktail";
import {environment} from "../../../environments/environment";
import {PersonalCocktail} from "../models/personal-cocktail";
import {AuthService} from "../login/auth-service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'

})

export class CocktailService {


  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllCocktails(): Observable<Cocktail[]> {

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`)
  }
  getCocktailsPaginated(page: number = 0, limit: number = 10): Observable<Cocktail[]> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(limit));

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`, { params });
  }


  getOneCocktailById(id: number): Observable<Cocktail> {

    return this.http.get<Cocktail>(`http://${environment.apiUrl}/cocktail/${id}`);

  }

  getCocktailsByIngredient(ingredient: string): Observable<Cocktail[]>{

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`).pipe(
      map(cocktails => cocktails.filter(cocktail=>
        Object.values(cocktail).slice(0, 12).includes(ingredient) ||
        Object.values(cocktail).slice(0, 12).includes(ingredient.replace(/\b\w/g, first => first.toLocaleUpperCase())) ||
        Object.values(cocktail).slice(0, 12).includes(ingredient.toLowerCase()))
      )
    );
  }

  getFavouriteCocktails(): Observable<Cocktail[]> {
    return this.authService.getUsername().pipe(
      take(1),
      switchMap(username => {
        if (username) {
          const url = `http://${environment.apiUrl}/user/favouritecocktails`;
          return this.http.get<Cocktail[]>(url);
        } else
        return of([]);
      })
    );
  }
}


@Injectable({
  providedIn: 'root'

})
export class PersonalCocktailService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllPersonalCocktails(): Observable<PersonalCocktail[]> {
    return this.authService.getUsername().pipe(
      take(1),
      switchMap(username => {
        if (username) {
          const url = `http://${environment.apiUrl}/user/personalcocktails`;
          return this.http.get<PersonalCocktail[]>(url);
        } else
          return of([]);
      })
    );
  }


  getOnePersonalCocktailById(id: number): Observable<PersonalCocktail> {

    return this.http.get<PersonalCocktail>(`http://${environment.apiUrl}/personalcocktail/${id}`);

  }

}
