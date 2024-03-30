import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Ingredient} from "../models/ingredient";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'

})

export class IngredientService{

  constructor(private http: HttpClient) {
  }

  getAllIngredients():Observable<Ingredient[]>{

    return this.http.get<Ingredient[]>(`http://${environment.apiUrl}/ingredients`)
  }
  getOneIngredientById(id: number): Observable<Ingredient>{

    return this.http.get<Ingredient>(`http://${environment.apiUrl}/ingredient/${id}`);

  }

  getOneIngredientByName(strDescription: string): Observable<Ingredient>{

    return this.http.get<Ingredient>(`http://${environment.apiUrl}/ingredient/name/${strDescription}`);

  }



}
