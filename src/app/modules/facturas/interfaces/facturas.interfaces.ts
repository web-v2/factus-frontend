/* export interface Facturas {
  data: [
    {
      id: number;
      document: {
        code: number;
        name: string;
      };
      number: string;
      api_client_name: string;
      reference_code: string;
      identification: string;
      graphic_representation_name: string;
      company: string;
      trade_name: string;
      names: string;
      email: string;
      total: string;
      status: number;
      errors?: [string, string];
      send_email: number;
      has_claim: number;
      is_negotiable_instrument: number;
      payment_form: {
        code: string;
        name: string;
      };
      created_at: string;
      credit_notes: [];
      debit_notes: [];
    }
  ];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    links: Links[];
  };
}

export interface errors {
  url: string;
  label: number;
  active: boolean;
  page: number;
}
export interface Links {
  url: string;
  label: number;
  active: boolean;
  page: number;
} */

export interface Facturas {
  data: Datum[];
  pagination: Pagination;
}

export interface Datum {
  id: number;
  document: Document;
  number: string;
  api_client_name?: string;
  reference_code: null | string;
  identification: string;
  graphic_representation_name: string;
  company: null | string;
  trade_name: null | string;
  names: string;
  email: null | string;
  total: string;
  status: number;
  errors: string[];
  send_email: number;
  has_claim: number;
  is_negotiable_instrument: number;
  payment_form: Payment_form;
  created_at: string;
  credit_notes: ItNote[];
  debit_notes: ItNote[];
}

export interface ItNote {
  id: number;
  number: string;
}

export interface Document {
  code: string;
  name: string;
}

export interface Payment_form {
  code: string;
  name: string;
}
export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  links: Link[];
}

export interface Link {
  url: null | string;
  label: number | string;
  active: boolean;
  page?: number;
}
