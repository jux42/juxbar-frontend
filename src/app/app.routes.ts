import { Routes } from '@angular/router';
import {SingleCocktailComponent} from "./cocktails/components/single-cocktail/single-cocktail.component";
import {CocktailListComponent} from "./cocktails/components/cocktail-list/cocktail-list.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {IngredientComponent} from "./ingredients/ingredient/ingredient.component";
import {SingleIngredientComponent} from "./ingredients/single-ingredient/single-ingredient.component";
import {IngredientListComponent} from "./ingredients/ingredient-list/ingredient-list.component";

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'juxbar', component: CocktailListComponent},
  {path: 'juxbar/onecocktail/:id', component: SingleCocktailComponent},
  {path: 'juxbar/ingredient/:strIngredient', component: IngredientComponent},
  {path: 'juxbar/detailledingredient/:strIngredient', component: SingleIngredientComponent },
  {path: 'juxbar/ingredients', component: IngredientListComponent},


];
