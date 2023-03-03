import { ContactFormType } from "@app/enums/contactForm";

export interface ContactForm {
  id: number;
  type: ContactFormType;
  message: string;
  email?: string;
  acceptedTerms: boolean;
}
