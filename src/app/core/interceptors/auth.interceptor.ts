import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedRoutes: string[] = ['/clientes', '/productos', '/public'];

  constructor(private authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Excluir rutas específicas
    if (this.isExcludedRoute(req.url)) {
      return next.handle(req);
    }

    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      return next.handle(req);
    }

    // Si el token está expirado, intenta renovarlo
    if (this.authService.isTokenExpired()) {
      return this.authService.refreshToken().pipe(
        switchMap(() => {
          const newAccessToken = localStorage.getItem('access_token');
          const clonedReq = this.addTokenToRequest(req, newAccessToken);
          return next.handle(clonedReq);
        }),
        catchError((error) => {
          console.error('Error al renovar el token', error);
          this.authService.logout(); // Opcional: manejar logout automático
          return throwError(() => error);
        })
      );
    }

    // Si el token es válido, añade el encabezado
    const clonedReq = this.addTokenToRequest(req, accessToken);
    console.log(clonedReq);
    return next.handle(clonedReq);
  }

  /**
   * Añade el token al encabezado de la solicitud
   */
  private addTokenToRequest(req: HttpRequest<any>, token: string | null) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Verifica si la URL está excluida del manejo del token
   */
  private isExcludedRoute(url: string): boolean {
    return this.excludedRoutes.some((route) => url.includes(route));
  }
}
