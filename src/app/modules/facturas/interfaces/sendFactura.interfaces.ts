import { Cliente } from '../../clientes/interfaces/cliente.interfaces';
import { Producto } from '../../productos/interfaces/producto.interfaces';

export interface sendFactura {
  numbering_range_id: number; // Se consume del endpoint es de rango de numeracion
  document?: string;
  reference_code: string; // referencia de la venta UUID
  observation: string; //Esta es la descripción general de la venta
  payment_method_code: number; // metodo de pago se consume por tabla, en documentacion
  billing_period?: Periodo[];
  customer: Cliente[];
  items: Producto[];
}

interface Periodo {
  start_date: string;
  start_time?: string;
  end_date: string;
  end_time?: string;
}
