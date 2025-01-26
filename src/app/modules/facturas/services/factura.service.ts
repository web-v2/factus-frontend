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

  createFactura(facturaData: sendFactura): Observable<void> {
    const url = `${this.apiUrl}/v1/bills/validate`;
    const token = localStorage.getItem('access_token');
    return this.http
      .post<void>(url, facturaData, {
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
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(() => new Error('Error al conectar con la API.'));
        })
      );
  }

  postFacturasMock(): Observable<sendFactura[]> {
    const clientes = [
      {
        identification: '123456789',
        dv: '1',
        company: 'Empresa Alpha',
        trade_name: 'Comercial Alpha',
        names: 'Juan Pérez',
        address: 'Calle 123 #45-67',
        email: 'juan.perez@alpha.com',
        phone: '3001234567',
        legal_organization_id: 1,
        tribute_id: 2,
        identification_document_id: 1,
        municipality_id: 101,
      },
      {
        identification: '987654321',
        dv: '2',
        company: 'Empresa Beta',
        trade_name: 'Comercial Beta',
        names: 'Ana Gómez',
        address: 'Carrera 9 #8-17',
        email: 'ana.gomez@beta.com',
        phone: '3109876543',
        legal_organization_id: 2,
        tribute_id: 1,
        identification_document_id: 2,
        municipality_id: 102,
      },
      {
        identification: '456789123',
        dv: '3',
        company: 'Empresa Gamma',
        trade_name: 'Comercial Gamma',
        names: 'Carlos López',
        address: 'Avenida 5 #6-78',
        email: 'carlos.lopez@gamma.com',
        phone: '3204567891',
        legal_organization_id: 1,
        tribute_id: 2,
        identification_document_id: 3,
        municipality_id: 103,
      },
      {
        identification: '321654987',
        dv: '4',
        company: 'Empresa Delta',
        trade_name: 'Comercial Delta',
        names: 'María Fernández',
        address: 'Calle 2 #34-56',
        email: 'maria.fernandez@delta.com',
        phone: '3303216549',
        legal_organization_id: 2,
        tribute_id: 1,
        identification_document_id: 1,
        municipality_id: 104,
      },
      {
        identification: '654321987',
        dv: '5',
        company: 'Empresa Epsilon',
        trade_name: 'Comercial Epsilon',
        names: 'Luis Martínez',
        address: 'Carrera 7 #8-21',
        email: 'luis.martinez@epsilon.com',
        phone: '3406543219',
        legal_organization_id: 1,
        tribute_id: 2,
        identification_document_id: 2,
        municipality_id: 105,
      },
    ];

    const productos = [
      {
        code_reference: 'P001',
        name: 'Producto 1',
        quantity: 10,
        price: 15000,
        tax_rate: '0.19',
        unit_measure_id: 1,
        is_excluded: 0,
      },
      {
        code_reference: 'S001',
        name: 'Servicio 1',
        quantity: 1,
        price: 50000,
        tax_rate: '0.16',
        unit_measure_id: 2,
        is_excluded: 0,
      },
      {
        code_reference: 'E001',
        name: 'Electrodoméstico 1',
        quantity: 2,
        price: 300000,
        tax_rate: '0.19',
        unit_measure_id: 3,
        is_excluded: 1,
      },
      {
        code_reference: 'R001',
        name: 'Ropa 1',
        quantity: 5,
        price: 20000,
        tax_rate: '0.15',
        unit_measure_id: 4,
        is_excluded: 0,
      },
      {
        code_reference: 'A001',
        name: 'Alimento 1',
        quantity: 20,
        price: 8000,
        tax_rate: '0.12',
        unit_measure_id: 5,
        is_excluded: 1,
      },
    ];

    const data: sendFactura[] = [
      {
        numbering_range_id: 1001,
        reference_code: 'a1b2c3d4',
        observation: 'Venta de productos varios',
        payment_method_code: 1,
        customer: [clientes[0]],
        items: [productos[0]],
      },
      {
        numbering_range_id: 1002,
        reference_code: 'e5f6g7h8',
        observation: 'Venta de servicios',
        payment_method_code: 2,
        customer: [clientes[1]],
        items: [productos[1]],
      },
      {
        numbering_range_id: 1003,
        reference_code: 'i9j0k1l2',
        observation: 'Venta de electrodomésticos',
        payment_method_code: 3,
        customer: [clientes[2]],
        items: [productos[2]],
      },
      {
        numbering_range_id: 1004,
        reference_code: 'm3n4o5p6',
        observation: 'Venta de ropa',
        payment_method_code: 4,
        customer: [clientes[3]],
        items: [productos[3]],
      },
      {
        numbering_range_id: 1005,
        reference_code: 'q7r8s9t0',
        observation: 'Venta de alimentos',
        payment_method_code: 5,
        customer: [clientes[4]],
        items: [productos[4]],
      },
    ];
    return of(data);
  }
}
