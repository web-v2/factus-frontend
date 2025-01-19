//src/app/services/cliente.service;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../interfaces/producto.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = environment.apiUrlLocal;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    const url = `${this.apiUrl}/productos/list`;
    return this.http.get<Producto[]>(url).pipe(
      tap((response) => {
        console.log('Respuesta del servicio:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  updateProducto(producto: Producto): Observable<void> {
    const url = `${this.apiUrl}/producto/`;
    return this.http.put<void>(url, producto).pipe(
      tap((response) => {
        console.log('Respuesta del servicio:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  newProducto(producto: Producto): Observable<void> {
    const url = `${this.apiUrl}/producto/new`;
    return this.http.post<void>(url, producto).pipe(
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
