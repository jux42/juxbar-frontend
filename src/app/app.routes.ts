import {Routes} from '@angular/router';
import {CocktailListComponent} from "./cocktails/components/cocktail-list/cocktail-list.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {IngredientListComponent} from "./ingredients/ingredient-list/ingredient-list.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {SoftDrinkListComponent} from "./soft-drinks/components/soft-drink-list/soft-drink-list.component";

export const routes: Routes = [
  {path: '', component: LandingPageComponent, data: {animation: 'LandingPage'}},
  {path: 'juxbar/mainpage', component: MainPageComponent, data: { animation: 'MainPage' }},
  {path: 'juxbar/listall', component: CocktailListComponent, data: { animation: 'CocktailListPage' }},
  {path: 'juxbar/onecocktail/:id', loadComponent:()=> import('./cocktails/components/single-cocktail/single-cocktail.component')
      .then(mod=>mod.SingleCocktailComponent), data: { animation: 'OneCocktailPage' }},
  {path: 'juxbar/onesoftdrink/:id', loadComponent:()=> import('./soft-drinks/components/single-soft-drink/single-soft-drink.component')
      .then(mod=>mod.SingleSoftDrinkComponent), data: { animation: 'OneSoftPage' }},
  {path: 'juxbar/listallsofts', component : SoftDrinkListComponent, data: { animation: 'SoftListPage' }},
  {path: 'juxbar/detailledingredient/:strIngredient', loadComponent:()=>(import('./ingredients/single-ingredient/single-ingredient.component'))
      .then(mod=> mod.SingleIngredientComponent, ), data: { animation: 'OneIngredientPage' }}

];

