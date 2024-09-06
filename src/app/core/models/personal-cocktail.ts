import {Cocktail} from "./cocktail";
import {Ingredient} from "./ingredient";
import {State} from "./state";

export class PersonalCocktail extends Cocktail{

  override id !: number;

  override idDrink!: string;


  imageData!: Blob;

  ownerName !: string;

  state!: State;

}

