import {Cocktail} from "./cocktail";
import {Ingredient} from "./ingredient";

export class PersonalCocktail extends Cocktail{

  override id !: number;

  override idDrink!: string;


  imageData!: Blob;

  ownerName !: string;

}
