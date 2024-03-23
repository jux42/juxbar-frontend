import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Cocktail} from "../models/cocktail";
import {Ingredient} from "../models/ingredient";


@Injectable({
  providedIn: 'root'

})

export class IngredientService{

  constructor(private http: HttpClient) {
  }

  getAllIngredients():Observable<Ingredient[]>{

    return this.http.get<Ingredient[]>(`http://localhost:8080/ingredients`)
  }
  getOneIngredientById(id: number): Observable<Ingredient>{

    return this.http.get<Ingredient>(`http://localhost:8080/ingredient/${id}`);

  }

  getOneIngredientByName(strDescription: string): Observable<Ingredient>{

    return this.http.get<Ingredient>(`http://localhost:8080/ingredient/name/${strDescription}`);

  }



}
