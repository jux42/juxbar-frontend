import {Cocktail} from "./cocktail";

export class PersonalCocktail extends Cocktail{

  override id !: number;

  override idDrink!: string;

  override strDrink!: string;

  override strDrinkThumb !: string;

  imageData!: Blob;

  override strInstructions !: string;

  override strIngredient1 !: string;

  override strIngredient2!: string;

  override strIngredient3 !: string;

  override strIngredient4 !: string;

  override strIngredient5 !: string;

  override strIngredient6 !: string;

  override strIngredient7 !: string;

  ownerName !: string;

}
