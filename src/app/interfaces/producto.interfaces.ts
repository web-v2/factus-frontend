export interface Producto {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate?: number; // valor del porcentatje de descuento
  price: number;
  tax_rate?: string; // valor del descuento aplicado
  unit_measure_id: number; // se consume del endpoint unidad de medida
  standard_code_id?: number; // codigo para productos o serviciois se consume de tabla
  is_excluded: number; // excluido de iva o no
  tribute_id?: number; // Tributto aplicado, se consume de endpoint tributo productos
  withholding_taxes?: [];
}
