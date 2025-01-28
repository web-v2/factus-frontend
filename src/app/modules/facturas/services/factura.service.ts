//src/app/modules/facturas/services/factura.service;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facturas } from '../interfaces/facturas.interfaces';
import { sendFactura } from '../interfaces/sendFactura.interfaces';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private apiUrl = environment.apiUrl;
  private apiUrlLocal = environment.apiUrlLocal;

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<Facturas> {
    const urlPeticion = `${this.apiUrl}/v1/bills`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<any>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          if (response.message === 'Solicitud exitosa') {
            console.log('Respuesta OK del servicio en Facturas', response.data);
          }
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  getBills(page: number): Observable<Facturas> {
    const urlPeticion = `${this.apiUrl}/v1/bills?page=${page}`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<any>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          if (response.message === 'Solicitud exitosa') {
            console.log('Respuesta OK del servicio en Facturas', response.data);
          }
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  viewFacturaPDF(num: string): Observable<Blob> {
    const urlPeticion = `${this.apiUrl}/v1/bills/download-pdf/${num}`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<any>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        map((response) => {
          try {
            const binaryData = atob(response.data.pdf_base_64_encoded);
            const byteNumbers = new Uint8Array(binaryData.length);

            for (let i = 0; i < binaryData.length; i++) {
              byteNumbers[i] = binaryData.charCodeAt(i);
            }

            return new Blob([byteNumbers], { type: 'application/pdf' });
          } catch (e) {
            throw new Error('Error al decodificar la cadena base64.');
          }
        }),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  getXml(num: string): Observable<Blob> {
    const urlPeticion = `${this.apiUrl}/v1/bills/download-xml/${num}`;
    const token = localStorage.getItem('access_token');

    return this.http
      .get<any>(urlPeticion, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        map((response) => {
          const xmlBase64 = response.data.xml_base_64_encoded;
          if (!xmlBase64 || typeof xmlBase64 !== 'string') {
            throw new Error(
              `El campo xml_base_64_encoded no es válido: ${xmlBase64}`
            );
          }
          const binaryData = atob(xmlBase64.replace(/\s/g, '')); // Elimina espacios si los hay
          const byteNumbers = new Uint8Array(binaryData.length);

          for (let i = 0; i < binaryData.length; i++) {
            byteNumbers[i] = binaryData.charCodeAt(i);
          }

          return new Blob([byteNumbers], { type: 'application/xml' });
        }),
        catchError((error) => {
          console.error('Error al descargar el XML:', error);
          return throwError(() => new Error('Error al descargar el XML.'));
        })
      );
  }

  createFactura(facturaData: sendFactura): Observable<any> {
    const url = `${this.apiUrl}/v1/bills/validate`;
    const token = localStorage.getItem('access_token');

    return this.http
      .post<any>(url, facturaData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          console.log('Respuesta del servicio:', response);
        }),
        map((response) => response.data),
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  sendToLocalApi(bill: any): Observable<any> {
    const url = `${this.apiUrlLocal}/bills`;
    return this.http.post(url, bill).pipe(
      tap((response) => {
        console.log('Factura enviada a la API local:', response);
      }),
      catchError((error) => {
        console.error('Error enviando factura a la API local:', error);
        return throwError(
          () => new Error('Error al conectar con la API local.')
        );
      })
    );
  }
}
