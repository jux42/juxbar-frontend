import {Injectable} from "@angular/core";
import {CocktailService} from "./cocktailService";


@Injectable()
export class FavouriteStateService {



  constructor(private cocktailService: CocktailService ) {
  this.cocktailService.getFavouriteCocktails();
  }


  // loadFavouriteCocktails(){
  //
  //   this.cocktailService.getFavouriteCocktails().pipe(
  //     map(favouriteCocktails => {
  //       this.isFavourite = favouriteCocktails.some(favCocktail => favCocktail.id === this.cocktail.id);
  //     })
  //   ).subscribe();




}
