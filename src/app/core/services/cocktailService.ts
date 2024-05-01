import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Cocktail} from "../models/cocktail";
import {environment} from "../../../environments/environment";
import {PersonalCocktail} from "../models/personal-cocktail";
import {UserRequest} from "../models/UserRequest";

@Injectable({
  providedIn: 'root'

})

export class CocktailService {

  constructor(private http: HttpClient) {
  }

  getAllCocktails(): Observable<Cocktail[]> {

    return this.http.get<Cocktail[]>(`http://${environment.apiUrl}/cocktails`)
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

}
@Injectable({
  providedIn: 'root'

})
export class PersonalCocktailService {
  constructor(private http: HttpClient) {
  }

  getAllPersonalCocktails(username: string): Observable<PersonalCocktail[]> {
    const url = `http://${environment.apiUrl}/personalcocktails`;
    const userRequest = new UserRequest(username);  // Assurez-vous que ceci est correctement instancié

    console.log(userRequest.username);
    return this.http.post<PersonalCocktail[]>(url, userRequest); // userRequest doit être un objet simple
  }

  getOneCocktailById(id: number): Observable<PersonalCocktail> {

    return this.http.get<PersonalCocktail>(`http://${environment.apiUrl}/personalcocktail/${id}`);

  }

}
