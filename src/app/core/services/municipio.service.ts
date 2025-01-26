// src/app/core/services/municipio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipio } from '../interfaces/municipio.interfaces';

interface RespMunicipio {
  status: string;
  message: string;
  data: Municipio[];
}

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMunicipios(): Observable<Municipio[]> {
    const urlPeticion = `${this.apiUrl}/v1/municipalities`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<RespMunicipio>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          if (response.message === 'Solicitud Exitosa') {
            console.log('Respuesta OK del servicio en Muncipio');
          }
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  getMunicipiosMock(): Observable<Municipio[]> {
    const data: Municipio[] = [
      { id: 1, code: '70001', name: 'Sincelejo', department: 'Sucre' },
      { id: 2, code: '70213', name: 'El Roble', department: 'Sucre' },
      { id: 3, code: '70215', name: 'Corozal', department: 'Sucre' },
      { id: 4, code: '70670', name: 'Sampués', department: 'Sucre' },
      { id: 5, code: '70717', name: 'Los Palmitos', department: 'Sucre' },
    ];
    return of(data);
  }
}
