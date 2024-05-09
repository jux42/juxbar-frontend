import {Routes} from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {ProfileComponent} from "./core/profile/profile.component";
import {CocktailListComponent} from "./drinks/cocktails/components/cocktail-list/cocktail-list.component";
import {SingleCocktailComponent} from "./drinks/cocktails/components/single-cocktail/single-cocktail.component";
import {SingleSoftDrinkComponent} from "./drinks/soft-drinks/components/single-soft-drink/single-soft-drink.component";
import {authGuard} from "./auth-guard";

export const routes: Routes = [

  {path: '', loadComponent:()=>import('./landing-page/landing-page.component').then(mod=>mod.LandingPageComponent), data: {animation: 'LandingPage'}},
  {path: 'login', component: LoginComponent, },
  {
    path: 'juxbar/profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  {path: 'juxbar/profile', component: ProfileComponent, data: {animation: 'ProfilePage'}},

  {path: 'juxbar/listall', component : CocktailListComponent, data: {animation: 'CocktailListPage'}},
  {
    path: 'juxbar/onecocktail/:id',
    component: SingleCocktailComponent, data: {animation: 'OneCocktailPage'}
  },
  {
    path: 'juxbar/onesoftdrink/:id',
    component: SingleSoftDrinkComponent, data: {animation: 'OneSoftPage'}
  },
  {path: 'juxbar/listallsofts', loadComponent: () => import('./drinks/soft-drinks/components/soft-drink-list/soft-drink-list.component')
      .then(mod => mod.SoftDrinkListComponent), data: {animation: 'SoftListPage'}},
  {
    path: 'juxbar/detailledingredient/:strIngredient',
    loadComponent: () => (import('./drinks/ingredients/single-ingredient/single-ingredient.component'))
      .then(mod => mod.SingleIngredientComponent,),
    data: {animation: 'OneIngredientPage'}
  },


];
