export interface Cliente {
  identification: string;
  dv?: number; // Digito de verificacion. se envia si es nit
  company?: string;
  trade_name?: string;
  names: string;
  address: string;
  email: string;
  phone: string;
  legal_organization_id: number;
  tribute_id: number;
  identification_document_id: number;
  municipality_id: number;
}
