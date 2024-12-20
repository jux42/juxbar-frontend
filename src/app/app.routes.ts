import {Routes} from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {ProfileComponent} from "./core/profile/profile.component";
import {authGuard} from "./auth-guard";
import {CocktailListComponent} from "./drinks/cocktails/components/cocktail-list/cocktail-list.component";
import {CocktailHomepageComponent} from "./homepages/cocktail-homepage/cocktail-homepage.component";
import {SoftdrinkHomepageComponent} from "./homepages/softdrink-homepage/softdrink-homepage.component";
import {AdminPageComponent} from "./admin/admin-page/admin-page.component";
import {RegisterComponent} from "./core/register/register.component";
import {SoftDrinkListComponent} from "./drinks/soft-drinks/components/soft-drink-list/soft-drink-list.component";

export const routes: Routes = [

  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page.component').then(mod => mod.LandingPageComponent),
    data: {animation: 'LandingPage'}
  },
  {path: 'login', component: LoginComponent,},
  {path: 'juxbar/cocktailhome', loadComponent: () => import ('./homepages/cocktail-homepage/cocktail-homepage.component')
      .then(mod => mod.CocktailHomepageComponent), data: {animation: 'CocktailHomepage'}},

  {path: 'juxbar/softdrinkhome', component: SoftdrinkHomepageComponent},

  {
    path: 'juxbar/profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: {animation: 'ProfilePage'}
  },
  {
    path: 'juxbar/register',
    component: RegisterComponent,
  },
  {
    path: 'juxbar/admin',
    component: AdminPageComponent,
    canActivate: [authGuard],
    data: {animation: 'AdminPage'}

  },
  {
    path: 'juxbar/profile/createcocktail',
    loadComponent: () => import ('./core/profile/personal-cocktail-creation-page/personal-cocktail-creation-page.component')
      .then(mod => mod.PersonalCocktailCreationPageComponent),
    canActivate: [authGuard],
  },


  {path: 'juxbar/listall', component: CocktailListComponent},

  {
    path: 'juxbar/listallsofts', component: SoftDrinkListComponent},

  {
    path: 'juxbar/onecocktail/:id',
    loadComponent: () => import('./drinks/cocktails/components/single-cocktail/single-cocktail.component')
      .then(mod => mod.SingleCocktailComponent), data: {animation: 'OneCocktailPage'}
  },
  {
    path: 'juxbar/onesoftdrink/:id',
    loadComponent: () => import('./drinks/soft-drinks/components/single-soft-drink/single-soft-drink.component')
      .then(mod => mod.SingleSoftDrinkComponent), data: {animation: 'OneSoftPage'}
  },

  {
    path: 'juxbar/detailledingredient/:strIngredient',
    loadComponent: () => (import('./drinks/ingredients/single-ingredient/single-ingredient.component'))
      .then(mod => mod.SingleIngredientComponent,),
    data: {animation: 'OneIngredientPage'}
  },


];
