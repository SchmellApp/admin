import { ContactFormType } from "@app/enums";

export const toContactTypeString = (contactType: ContactFormType): string => {
  switch (contactType) {
    case ContactFormType.Contact:
      return "Kontakt";
    case ContactFormType.Feedback:
      return "Feedback";
    default:
      return "Unknown";
  }
};
