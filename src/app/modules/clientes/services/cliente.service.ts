//src/app/modules/clientes/services/cliente.service;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = environment.apiUrlLocal;

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    const url = `${this.apiUrl}/clientes/list`;
    return this.http.get<Cliente[]>(url).pipe(
      tap((response) => {
        console.log('Respuesta del servicio[Clientes]:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  updateCliente(cliente: Cliente): Observable<void> {
    const url = `${this.apiUrl}/clientes/`;
    return this.http.put<void>(url, cliente).pipe(
      tap((response) => {
        console.log('Respuesta del servicio[Clientes]:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  newCliente(cliente: Cliente): Observable<void> {
    const url = `${this.apiUrl}/clientes/new`;
    return this.http.post<void>(url, cliente).pipe(
      tap((response) => {
        console.log('Respuesta del servicio[Clientes]:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    const urlPeticion = `${this.apiUrl}/clientes/${id}`;
    return this.http.get<Cliente>(urlPeticion).pipe(
      tap((response) => {
        console.log('Respuesta del servicio[Clientes]:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }
}
