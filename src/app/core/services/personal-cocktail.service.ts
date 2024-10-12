import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {PersonalCocktail} from "../models/personal-cocktail";
import {Observable, of, switchMap} from "rxjs";
import {map, take} from "rxjs/operators";
import {State} from "../models/state";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../login/auth-service";

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
          const url = `${environment.apiUrl}/user/personalcocktails`;
          return this.http.get<PersonalCocktail[]>(url).pipe(
            map(cocktails => cocktails.map(cocktail => {
              cocktail.state = cocktail.state || State.SHOWED;
              return cocktail;
            })))
        } else
          return of([]);
      })
    );
  }

  getPersonalCocktailsOfUser(username: string): Observable<PersonalCocktail[]> {


    const url = `${environment.apiUrl}/user/personalcocktails/${username}`;
    return this.http.get<PersonalCocktail[]>(url, {responseType: "json"});
  }


  getOnePersonalCocktailById(id: number): Observable<PersonalCocktail> {

    return this.http.get<PersonalCocktail>(`${environment.apiUrl}/user/personalcocktail/${id}`);

  }


  savePersonalCocktail(personalCocktail: PersonalCocktail): Observable<any> {


    return this.http.post(`${environment.apiUrl}/user/personalcocktail`, personalCocktail, {responseType: 'text' as 'json'});
  }

  savePersonalCocktailImage(cocktailName: string, blob: Blob): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/personalcocktail/image/${cocktailName}`, blob, {
      headers: {'Content-Type': 'application/octet-stream'},
      responseType: 'text'
    });
  }

  deletePersonalCocktail(personalCocktail: PersonalCocktail): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/user/personalcocktail/${personalCocktail.id}`, {responseType: 'text' as 'json'});
  }

  trashPersonalCocktail(personalCocktail: PersonalCocktail): Observable<string> {
    return this.http.put(`${environment.apiUrl}/user/personalcocktail/trash/${personalCocktail.id}`, {}, {responseType: 'text'});

  }
}
