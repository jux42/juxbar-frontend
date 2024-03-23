import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cocktail} from "../models/cocktail";


@Injectable({
  providedIn: 'root'

})

export class CocktailService{

  constructor(private http: HttpClient) {
  }

  getAllCocktails():Observable<Cocktail[]>{

    return this.http.get<Cocktail[]>(`http://localhost:8080/cocktails`)
  }
  getOneCocktailById(id: number): Observable<Cocktail>{

    return this.http.get<Cocktail>(`http://localhost:8080/cocktail/${id}`);

  }


}
