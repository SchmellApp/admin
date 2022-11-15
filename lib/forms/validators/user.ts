import { FormRulesRecord } from "@mantine/form/lib/types";
import { EditUserForm } from "@app/types";

export const editUserValidator: FormRulesRecord<EditUserForm> = {
  firstName: (value) => !(value.length > 0) && "Må skrive inn fornavn",
  lastName: (value) => !(value.length > 0) && "Må skrive inn etternavn",
  email: (value) => !(value.length > 0) && "Må skrive inn epost",
  phoneNumber: (value) => value === 0 && "Må skrive inn telefonnummer"
};
