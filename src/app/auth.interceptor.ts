import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from "./core/login/auth-service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();   // Récupérer le token stocké

  if (token) {
    // Cloner la requête pour ajouter l'en-tête d'autorisation
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);  // Passer la requête modifiée au prochain gestionnaire
  }

  return next(req);
};
