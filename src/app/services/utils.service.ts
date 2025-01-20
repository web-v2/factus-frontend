// src/app/services/utils.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadMedidas } from '../interfaces/unidad-medida.interfaces';
import { Tributos } from '../interfaces/tributos.interfaces';

interface RespUMedida {
  status: string;
  message: string;
  data: UnidadMedidas[];
}

interface RespTributos {
  status: string;
  message: string;
  data: Tributos[];
}

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUnidadMedidas(): Observable<UnidadMedidas[]> {
    const urlPeticion = `${this.apiUrl}/v1/measurement-units`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<RespUMedida>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          if (response.message === 'Solicitud Exitosa') {
            console.log('Respuesta OK del servicio en utils/unidadesMedidas');
          }
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  getTributos(): Observable<Tributos[]> {
    const urlPeticion = `${this.apiUrl}/v1/tributes/products?name=`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<RespTributos>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          if (response.message === 'Solicitud Exitosa') {
            console.log('Respuesta OK del servicio en utils/tributos');
          }
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  getUnidadMedidasMock(): Observable<UnidadMedidas[]> {
    const data: UnidadMedidas[] = [
      { id: 70, code: '94', name: 'unidad' },
      { id: 414, code: 'KGM', name: 'Kilogramo' },
      { id: 449, code: 'LBR', name: 'Libra' },
      { id: 512, code: 'MTR', name: 'Metro' },
      { id: 874, code: 'GLL', name: 'Galón' },
    ];
    return of(data);
  }

  getTributosMock(): Observable<Tributos[]> {
    const data: Tributos[] = [
      {
        id: 1,
        code: '01',
        name: 'IVA',
        description: 'Impuesto sobre la Ventas',
      },
      {
        id: 2,
        code: '02',
        name: 'IC',
        description: 'Impuesto al Consumo Departamental Nominal',
      },
      {
        id: 3,
        code: '03',
        name: 'ICA',
        description: 'Impuesto de Industria, Comercio y Aviso',
      },
      {
        id: 4,
        code: '04',
        name: 'INC',
        description: 'Impuesto Nacional al Consumo',
      },
      {
        id: 5,
        code: '05',
        name: 'ReteIVA',
        description: 'Retención sobre el IVA',
      },
      {
        id: 6,
        code: '06',
        name: 'ReteRenta',
        description: 'Retención sobre renta',
      },
    ];
    return of(data);
  }
}
