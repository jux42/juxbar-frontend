import {Ingredient} from "./ingredient";

export class Drink {
  id !: number;

  idDrink!: string;
  strDrink!: string;
  strDrinkThumb !: string;

  strInstructions !: string;

  ingredient1!: Ingredient;
  ingredient2!: Ingredient;
  ingredient3 !: Ingredient;
  ingredient4 !: Ingredient;
  ingredient5!: Ingredient;
  ingredient6!: Ingredient;
  ingredient7!: Ingredient;

  strIngredient1?: string = this.ingredient1.strIngredient;
  strIngredient2?: string = this.ingredient2.strIngredient;
  strIngredient3 ?: string = this.ingredient3.strIngredient;
  strIngredient4 ?: string = this.ingredient4.strIngredient;
  strIngredient5?: string = this.ingredient5.strIngredient;
  strIngredient6?: string = this.ingredient6.strIngredient;
  strIngredient7: string = this.ingredient7.strIngredient;

}
