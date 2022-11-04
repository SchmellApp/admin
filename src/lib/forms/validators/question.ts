import {
  CreateQuestionForm,
  CreateQuestionJsonForm,
  EditQuestionForm
} from "@/types/forms/question";
import { Question } from "@/types/question";
import { FormRulesRecord } from "@mantine/form/lib/types";

export const createQuestionValidator: FormRulesRecord<CreateQuestionForm> = {
  type: (value) => !(value.length > 0) && "Må skrive inn en type",
  questionDescription: (value) =>
    !(value.length > 0) && "Må skrive inn en beskrivelse",
  phase: (value) => value === 0 && "Må skrive inn en fase",
  punishment: (value) => value === 0 && "Må skrive inn en straff"
};

export const createQuestionJsonValidator: FormRulesRecord<CreateQuestionJsonForm> =
  {
    json: (value) => !(value.length > 0) && "Må legge til minimum et spørsmål"
  };

export const editQuestionValidator: FormRulesRecord<EditQuestionForm> = {
  type: (value) => !(value.length > 0) && "Må skrive inn type",
  questionDescription: (value) =>
    !(value.length > 0) && "Må skrive inn spørsmål",
  phase: (value) => value === 0 && "Må skrive inn fase",
  punishment: (value) => value === 0 && "Må skrive inn straff",
  questionPicture: (value: File | undefined) =>
    value === undefined && "Må laste opp bilde"
};
