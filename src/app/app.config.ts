import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {CapitalizeFirstPipe} from "./capitalize-first.pipe";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    CapitalizeFirstPipe

  ]

};
