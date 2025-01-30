// src/app/core/services/tipoDocumento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoDocumentos } from '../interfaces/tipo-documentos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private apiUrl = environment.apiUrlLocal;

  constructor(private http: HttpClient) {}

  getTipoDocumentos(): Observable<any[]> {
    const url = `${this.apiUrl}/tipo-documentos`;
    return this.http.get<TipoDocumentos[]>(url).pipe(
      tap((response) => {
        console.log('Respuesta del servicio[Tipos-Documentos]:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  }
}
