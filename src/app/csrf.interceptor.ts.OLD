import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./core/login/auth-service";

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const csrfToken = authService.getCsrfToken(); // Utilisation de la méthode getCsrfToken du service

  if (csrfToken) {
    const csrfReq = req.clone({
      headers: req.headers.set('X-XSRF-TOKEN', csrfToken) // En-tête XSRF-TOKEN
    });
    return next(csrfReq);
  }

  return next(req);
};
