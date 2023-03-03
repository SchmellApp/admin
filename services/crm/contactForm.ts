import { ContactFormFilters } from "@app/types";
import { ContactForm } from "@app/types/contactForm";
import { axiosInstance } from "@app/services";

export const getContactForms = async (
  filters: ContactFormFilters
): Promise<ContactForm[]> =>
  await axiosInstance
    .get("/crm/contact/", { params: filters })
    .then((res) => res.data);

export const deleteContactForm = async (id: number): Promise<void> =>
  await axiosInstance.delete(`/crm/contact/${id}/`);
