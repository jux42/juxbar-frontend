import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withXsrfConfiguration} from "@angular/common/http";
import {CapitalizeFirstPipe} from "./capitalize-first.pipe";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    CapitalizeFirstPipe,
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'JUXBAR-XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }))

  ]

};
