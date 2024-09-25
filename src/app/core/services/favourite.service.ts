import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../login/auth-service";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private favouriteRemovedSource = new Subject<{ id: number, type: string }>();
  favouriteRemoved$ = this.favouriteRemovedSource.asObservable();
  // private favouriteDrink$ = this.getFavouriteDrink().pipe(
  //   shareReplay(1)
  // );

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  announceFavouriteRemoved(id: number, type: string) {
    this.favouriteRemovedSource.next({id, type});
  }



  // getFavouriteDrink(): Observable<Cocktail[]> {
  //   return this.authService.getUsername().pipe(
  //     take(1),
  //     switchMap(username => {
  //       if (username) {
  //         const url = `${environment.apiUrl}/user/favouritecocktails`;
  //         return this.http.get<Cocktail[]>(url).pipe(
  //           tap(favCocktails => {
  //             sessionStorage.setItem("favouritecocktails", JSON.stringify(favCocktails));
  //           })
  //         );
  //       } else {
  //         return of([]);
  //       }
  //     })
  //   );
  // }

  addFavouriteDrink(id: number, drinkType: string): Observable<String> {
    const url = `${environment.apiUrl}/user/favouritecocktail/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }

  removeFavouriteDrink(id: number, drinkType: string): Observable<String> {
    const url = `${environment.apiUrl}/user/rmfavouritecocktail/${id}`;
    return this.http.put<String>(url, {}, {responseType: 'text' as 'json'});
  }


  // getFavouriteCocktailsCached(): Observable<Cocktail[]> {
  //   return this.favouriteDrink$;
  // }
}
