import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {importProvidersFrom, isDevMode} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./app/auth.interceptor";
import {provideServiceWorker} from '@angular/service-worker';
import {csrfInterceptor} from "./app/csrf.interceptor";



bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(
      // registering interceptors
      withInterceptors([authInterceptor, csrfInterceptor])),
    importProvidersFrom(BrowserAnimationsModule), provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}).catch((err: any) => console.error(err));
