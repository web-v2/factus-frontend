// src/app/core/services/metodosPago.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MetodosPago } from '../interfaces/metodos-pago.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MetodosPagoService {
  private apiUrl = environment.apiUrlLocal;

  constructor(private http: HttpClient) {}

  getMetodosPago(): Observable<any[]> {
    const url = `${this.apiUrl}/metodos-pago`;
    return this.http.get<MetodosPago[]>(url).pipe(
      tap((response) => {
        console.log('Respuesta del servicio:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }
}
