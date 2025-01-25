export interface Factura {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  company: Company;
  customer: Customer;
  numbering_range: NumberingRange;
  billing_period: BillingPeriod;
  bill: Bill;
  related_documents: any[];
  items: Item[];
  withholding_taxes: WithholdingTax[];
  credit_notes: any[];
  debit_notes: any[];
}

export interface Bill {
  id: number;
  document: Document;
  number: string;
  reference_code: string;
  status: number;
  send_email: number;
  qr: string;
  cufe: string;
  validated: string;
  discount_rate: string;
  discount: string;
  gross_value: string;
  taxable_amount: string;
  tax_amount: string;
  total: string;
  observation: null;
  errors: any[];
  created_at: string;
  payment_due_date: null;
  qr_image: string;
  has_claim: number;
  is_negotiable_instrument: number;
  payment_form: Document;
  payment_method: Document;
  public_url: string;
}

export interface Document {
  code: string;
  name: string;
}

export interface BillingPeriod {
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
}

export interface Company {
  url_logo: string;
  nit: string;
  dv: string;
  company: string;
  name: string;
  graphic_representation_name: string;
  registration_code: string;
  economic_activity: string;
  phone: string;
  email: string;
  direction: string;
  municipality: string;
}

export interface Customer {
  identification: string;
  dv: null;
  graphic_representation_name: string;
  trade_name: string;
  company: string;
  names: string;
  address: string;
  email: string;
  phone: string;
  legal_organization: LegalOrganization;
  tribute: LegalOrganization;
  municipality: LegalOrganization;
}

export interface LegalOrganization {
  id: number;
  code: string;
  name: string;
}

export interface Item {
  code_reference: string;
  name: string;
  quantity: number;
  discount_rate: string;
  discount: string;
  gross_value: string;
  tax_rate: string;
  taxable_amount: string;
  tax_amount: string;
  price: string;
  is_excluded: number;
  unit_measure: LegalOrganization;
  standard_code: LegalOrganization;
  tribute: LegalOrganization;
  total: number;
  withholding_taxes: WithholdingTax[];
}

export interface WithholdingTax {
  tribute_code: string;
  name: string;
  value: string;
  rates?: Rate[];
}

export interface Rate {
  code: string;
  name: string;
  rate: string;
}

export interface NumberingRange {
  prefix: string;
  from: number;
  to: number;
  resolution_number: string;
  start_date: string;
  end_date: string;
  months: number;
}

export interface downloadFactura {
  file_name: string;
  pdf_base_64_encoded: string;
}
