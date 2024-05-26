import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {CapitalizeFirstPipe} from "./capitalize-first.pipe";
import {CocktailComponent} from "./drinks/cocktails/components/cocktail/cocktail.component";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    CocktailComponent,
    CapitalizeFirstPipe,
    provideHttpClient(),

  ]

};
