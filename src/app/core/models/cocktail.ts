import {Drink} from "./drink";

export class Cocktail extends Drink {
  override id !: number;

  override idDrink!: string

  _uniqueKey?: number;


}
