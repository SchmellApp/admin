import { CreateQuestionTypeForm, EditQuestionTypeForm } from "@app/types";
import { FormRulesRecord } from "@mantine/form/lib/types";

export const createQuestionTypeValidator: FormRulesRecord<CreateQuestionTypeForm> =
  {
    name: (value) => !(value.length > 0) && "Må skrive inn et navn",
    hint: (value) => !(value.length > 0) && "Må skrive inn en hint",
    hexColor: (value) => !(value.length > 0) && "Må velge en farge"
  };

export const editQuestionTypeValidator: FormRulesRecord<EditQuestionTypeForm> =
  {
    name: (value: string | undefined) =>
      value != null && !(value.length > 0) && "Må skrive inn et navn",
    hint: (value: string | undefined) =>
      value != null && !(value.length > 0) && "Må skrive inn en hint",
    hexColor: (value: string | undefined) =>
      value != null && !(value.length > 0) && "Må velge en farge"
  };
