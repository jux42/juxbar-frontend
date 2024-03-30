import { Routes } from '@angular/router';
import {CocktailListComponent} from "./cocktails/components/cocktail-list/cocktail-list.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {IngredientListComponent} from "./ingredients/ingredient-list/ingredient-list.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SoftDrinkListComponent} from "./soft-drink-list/soft-drink-list.component";

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'juxbar/mainpage', component: MainPageComponent},
  {path: 'juxbar/listall', component: CocktailListComponent},
  {path: 'juxbar/onecocktail/:id', loadComponent:()=> import('./cocktails/components/single-cocktail/single-cocktail.component').then(mod=>mod.SingleCocktailComponent)},
  {path: 'juxbar/listallsofts', component : SoftDrinkListComponent},
  {path: 'juxbar/detailledingredient/:strIngredient', loadComponent:()=>(import('./ingredients/single-ingredient/single-ingredient.component')).then(mod=> mod.SingleIngredientComponent)},
  {path: 'juxbar/ingredients', component: IngredientListComponent},

];
