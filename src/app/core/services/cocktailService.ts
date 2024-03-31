import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cocktail} from "../models/cocktail";
import {environment} from "../../../environments/environment";

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

}
