import {Drink} from "./drink";
import {Ingredient} from "./ingredient";

export class SoftDrink extends Drink{

  override id !: number;

  override idDrink!: string;

  _uniqueKey?: number;


}
