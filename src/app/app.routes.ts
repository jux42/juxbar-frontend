import {Routes} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";

export const routes: Routes = [
  {path: '', loadComponent:()=>import('./landing-page/landing-page.component').then(mod=>mod.LandingPageComponent), data: {animation: 'LandingPage'}},
  {path: 'juxbar/mainpage', component: MainPageComponent, data: {animation: 'MainPage'}},
  {path: 'juxbar/listall', loadComponent: () => import('./cocktails/components/cocktail-list/cocktail-list.component')
      .then(mod => mod.CocktailListComponent), data: {animation: 'CocktailListPage'}},
  {
    path: 'juxbar/onecocktail/:id',
    loadComponent: () => import('./cocktails/components/single-cocktail/single-cocktail.component')
      .then(mod => mod.SingleCocktailComponent),
    data: {animation: 'OneCocktailPage'}
  },
  {
    path: 'juxbar/onesoftdrink/:id',
    loadComponent: () => import('./soft-drinks/components/single-soft-drink/single-soft-drink.component')
      .then(mod => mod.SingleSoftDrinkComponent),
    data: {animation: 'OneSoftPage'}
  },
  {path: 'juxbar/listallsofts', loadComponent: () => import('./soft-drinks/components/soft-drink-list/soft-drink-list.component')
      .then(mod => mod.SoftDrinkListComponent), data: {animation: 'SoftListPage'}},
  {
    path: 'juxbar/detailledingredient/:strIngredient',
    loadComponent: () => (import('./ingredients/single-ingredient/single-ingredient.component'))
      .then(mod => mod.SingleIngredientComponent,),
    data: {animation: 'OneIngredientPage'}
  }

];
