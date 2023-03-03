import { ContactFormType } from "@app/enums";

export interface ContactForm {
  id: number;
  type: ContactFormType;
  message: string;
  email?: string;
  acceptedTerms: boolean;
  createdDate: Date;
}

export interface ContactFormPaginatedResponse {
  contactForms: ContactForm[];
  total: number;
  page: number;
  lastPage: number;
}
