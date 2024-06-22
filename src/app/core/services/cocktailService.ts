import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {Cocktail} from "../models/cocktail";
import {environment} from "../../../environments/environment";
import {PersonalCocktail} from "../models/personal-cocktail";
import {AuthService} from "../login/auth-service";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'

})

export class CocktailService {

  private favouriteCocktails$ = this.getFavouriteCocktails().pipe(
    shareReplay(1)
  );
  private allCocktails$ = this.getAllCocktails().pipe(
    shareReplay(1)
  );

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllCocktails(): Observable<Cocktail[]> {

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`)
  }

  getCocktailsPaginated(page: number = 0, limit: number = 10): Observable<Cocktail[]> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('size', String(limit));

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`, {params});
  }

  getAllCocktailsCached() {
    return this.allCocktails$.pipe();
  }


  getOneCocktailById(id: number): Observable<Cocktail> {

    return this.http.get<Cocktail>(`http://${environment.apiUrl}/cocktail/${id}`);

  }

  getCocktailsByIngredient(ingredient: string): Observable<Cocktail[]> {
    console.log(ingredient);

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`).pipe(
      map(cocktails => cocktails.filter(cocktail =>
        Object.values(cocktail).slice(0, 12).includes(ingredient) ||
        Object.values(cocktail).slice(0, 12).includes(ingredient.replace(/\b\w{3,}\b/g, word =>
          word.replace(/^\w/, first => first.toLocaleUpperCase()))) ||
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
          return this.http.get<Cocktail[]>(url).pipe(
            tap(favCocktails => {
              localStorage.setItem("favouritecocktails", JSON.stringify(favCocktails));
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }

  addFavouriteCocktail(id: number): Observable<String> {
    const url = `http://${environment.apiUrl}/user/favouritecocktail/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }

  removeFavouriteCocktail(id: number): Observable<String> {
    const url = `http://${environment.apiUrl}/user/rmfavouritecocktail/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }


  getFavouriteCocktailsCached(): Observable<Cocktail[]> {
    return this.favouriteCocktails$;
  }

  getCocktailOfTheDayId(maxId: number): number {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return this.pseudoRandomNumber(seed, 1, maxId);
  }

  private pseudoRandomNumber(seed: number, min: number, max: number): number {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
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

    return this.http.get<PersonalCocktail>(`http://${environment.apiUrl}/user/personalcocktail/${id}`);

  }


  savePersonalCocktail(personalCocktail: PersonalCocktail): Observable<any> {


    return this.http.post(`http://${environment.apiUrl}/user/personalcocktail`, personalCocktail, {responseType: 'text' as 'json'});
  }

  deletePersonalCocktail(personalCocktail: PersonalCocktail): Observable<any>{
    return this.http.delete(`http://${environment.apiUrl}/user/personalcocktail/${personalCocktail.id}`, {responseType: 'text' as 'json'});
  }

}
