//src/app/modules/facturas/services/factura.service;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Facturas } from '../interfaces/facturas.interfaces';
import { sendFactura } from '../interfaces/sendFactura.interfaces';

interface RespFacturas {
  status: string;
  message: string;
  data: Facturas[];
}
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

  /* newProducto(producto: Factura): Observable<void> {
    const url = `${this.apiUrl}/productos/new`;
    return this.http.post<void>(url, producto).pipe(
      tap((response) => {
        console.log('Respuesta del servicio:', response);
      }),
      catchError((error) => {
        console.error('Error en el servicio:', error);
        return throwError(() => new Error('Error al conectar con la API.'));
      })
    );
  } */

  getFacturasMock(): Observable<Facturas> {
    const data: Facturas = {
      data: [
        {
          id: 400,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000203',
          api_client_name: 'Halltec',
          reference_code: 'I3',
          identification: '123456789',
          graphic_representation_name: 'Alan Turing',
          company: '',
          trade_name: '',
          names: 'Alan Turing',
          email: 'alanturing@enigmasas.com',
          total: '90000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 1,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '17-07-2024 03:54:10 PM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 397,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000202',
          reference_code: null,
          identification: '1100970785',
          graphic_representation_name: 'Pepito Perez',
          company: '',
          trade_name: null,
          names: 'Pepito Perez',
          email: 'pepito@hotmail.com',
          total: '50000.00',
          status: 0,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 1,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '17-07-2024 09:57:47 AM',
          credit_notes: [
            {
              id: 105,
              number: 'NC62',
            },
          ],
          debit_notes: [
            {
              id: 43,
              number: 'ND28',
            },
          ],
        },
        {
          id: 396,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000201',
          reference_code: null,
          identification: '1100970785',
          graphic_representation_name: 'Pepito Perez',
          company: '',
          trade_name: null,
          names: 'Pepito Perez',
          email: 'pepito@hotmail.com',
          total: '27000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 1,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '17-07-2024 09:46:05 AM',
          credit_notes: [
            {
              id: 106,
              number: 'NC63',
            },
          ],
          debit_notes: [],
        },
        {
          id: 386,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000200',
          reference_code: null,
          identification: '12345666',
          graphic_representation_name: 'Pepito Perez',
          company: '',
          trade_name: null,
          names: 'Pepito Perez',
          email: 'pepito@hotmail.com',
          total: '27000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 1,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '16-07-2024 09:44:08 PM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 377,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000199',
          reference_code: null,
          identification: '06141002791018',
          graphic_representation_name: 'Pepito Perez',
          company: '',
          trade_name: '',
          names: 'Pepito Perez',
          email: null,
          total: '50000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 0,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '08-07-2024 04:24:27 PM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 376,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000198',
          reference_code: null,
          identification: '900825759',
          graphic_representation_name: 'Halltec S.a.s',
          company: 'Halltec S.a.s',
          trade_name: null,
          names: '',
          email: null,
          total: '90000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 0,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '08-07-2024 04:15:06 PM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 375,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000197',
          reference_code: null,
          identification: '900825759',
          graphic_representation_name: 'Halltec S.a.s',
          company: 'Halltec S.a.s',
          trade_name: null,
          names: '',
          email: null,
          total: '90000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 0,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '08-07-2024 03:43:33 PM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 374,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000196',
          reference_code: null,
          identification: '9247016',
          graphic_representation_name: 'Ryley Von',
          company: '',
          trade_name: '',
          names: 'Ryley Von',
          email: 'sydnie27@hotmail.com',
          total: '90000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 1,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '08-07-2024 03:31:22 PM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 373,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000195',
          reference_code: null,
          identification: '222222222222',
          graphic_representation_name: 'Consumidor final',
          company: '',
          trade_name: null,
          names: 'Consumidor final',
          email: '',
          total: '20000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 0,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '01-07-2024 11:17:59 AM',
          credit_notes: [],
          debit_notes: [],
        },
        {
          id: 372,
          document: {
            code: '01',
            name: 'Factura electrónica de Venta',
          },
          number: 'SETP990000194',
          reference_code: null,
          identification: '122345566',
          graphic_representation_name: 'Pepito Perez',
          company: '',
          trade_name: null,
          names: 'Pepito Perez',
          email: 'pepito@hotmail.com',
          total: '20000.00',
          status: 1,
          errors: [
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
            'Regla: FAJ43b, Notificación: Nombre informado No corresponde al registrado en el RUT con respecto al Nit suminstrado.',
          ],
          send_email: 1,
          has_claim: 0,
          is_negotiable_instrument: 0,
          payment_form: {
            code: '1',
            name: 'Pago de contado',
          },
          created_at: '27-06-2024 04:48:24 PM',
          credit_notes: [],
          debit_notes: [],
        },
      ],
      pagination: {
        total: 162,
        per_page: 10,
        current_page: 1,
        last_page: 17,
        from: 1,
        to: 10,
        links: [
          {
            url: null,
            label: '&laquo; Anterior',
            active: false,
          },
          {
            url: 'http://api.test/v1/bills?page=1',
            label: 1,
            active: true,
            page: 1,
          },
          {
            url: 'http://api.test/v1/bills?page=2',
            label: 2,
            active: false,
            page: 2,
          },
          {
            url: 'http://api.test/v1/bills?page=3',
            label: 3,
            active: false,
            page: 3,
          },
          {
            url: 'http://api.test/v1/bills?page=4',
            label: 4,
            active: false,
            page: 4,
          },
          {
            url: null,
            label: '...',
            active: false,
          },
          {
            url: 'http://api.test/v1/bills?page=17',
            label: 17,
            active: false,
            page: 17,
          },
          {
            url: 'http://api.test/v1/bills?page=2',
            label: 'Siguiente &raquo;',
            active: false,
          },
        ],
      },
    };
    return of(data);
  }

  postFacturasMock(): Observable<sendFactura[]> {
    const clientes = [
      {
        identification: 123456789,
        dv: '1',
        company: 'Empresa Alpha',
        trade_name: 'Comercial Alpha',
        names: 'Juan Pérez',
        address: 'Calle 123 #45-67',
        email: 'juan.perez@alpha.com',
        phone: 3001234567,
        legal_organization_id: 1,
        tribute_id: 2,
        identification_document_id: 1,
        municipality_id: 101,
      },
      {
        identification: 987654321,
        dv: '2',
        company: 'Empresa Beta',
        trade_name: 'Comercial Beta',
        names: 'Ana Gómez',
        address: 'Carrera 9 #8-17',
        email: 'ana.gomez@beta.com',
        phone: 3109876543,
        legal_organization_id: 2,
        tribute_id: 1,
        identification_document_id: 2,
        municipality_id: 102,
      },
      {
        identification: 456789123,
        dv: '3',
        company: 'Empresa Gamma',
        trade_name: 'Comercial Gamma',
        names: 'Carlos López',
        address: 'Avenida 5 #6-78',
        email: 'carlos.lopez@gamma.com',
        phone: 3204567891,
        legal_organization_id: 1,
        tribute_id: 2,
        identification_document_id: 3,
        municipality_id: 103,
      },
      {
        identification: 321654987,
        dv: '4',
        company: 'Empresa Delta',
        trade_name: 'Comercial Delta',
        names: 'María Fernández',
        address: 'Calle 2 #34-56',
        email: 'maria.fernandez@delta.com',
        phone: 3303216549,
        legal_organization_id: 2,
        tribute_id: 1,
        identification_document_id: 1,
        municipality_id: 104,
      },
      {
        identification: 654321987,
        dv: '5',
        company: 'Empresa Epsilon',
        trade_name: 'Comercial Epsilon',
        names: 'Luis Martínez',
        address: 'Carrera 7 #8-21',
        email: 'luis.martinez@epsilon.com',
        phone: 3406543219,
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
