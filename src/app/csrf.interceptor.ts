import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "./core/login/auth-service";

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

    const csrfReq = req.clone({
      headers: req.headers.set('X-XSRF-TOKEN', 'JUXBAR-XSRF-TOKEN')
    });
    return next(csrfReq);

}
