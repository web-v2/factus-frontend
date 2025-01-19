export interface Cliente {
  identification: number;
  dv?: string; // Digito de verificacion. se envia si es nit
  company?: string;
  trade_name?: string;
  names: string;
  address: string;
  email: string;
  phone: number;
  legal_organization_id: number; //Tipo de organizacion, persona natural o juridica. se consume de tabla
  tribute_id: number; // Si aplica o no aplica iva. se consume de tabla
  identification_document_id: number; // Tipo de identificacion se consume de tabla
  municipality_id: number; // municipio del cliente, se consume del endpoint municipios
}
