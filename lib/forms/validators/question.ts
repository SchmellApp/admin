import { CreateQuestionForm, EditQuestionForm } from "@app/types";
import { FormRulesRecord } from "@mantine/form/lib/types";

export const createQuestionValidator: FormRulesRecord<CreateQuestionForm> = {
  relatedQuestionType: (value) => value === undefined && "Må velge en type",
  questionDescription: (value) =>
    !(value.length > 0) && "Må skrive inn en beskrivelse",
  phase: (value) => value === 0 && "Må skrive inn en fase",
  activeWeeks: (value: number[] | undefined) =>
    (value === undefined || value?.length === 0) && "Må velge minst én uke"
};

export const editQuestionValidator: FormRulesRecord<EditQuestionForm> = {
  relatedQuestionType: (value) => value === undefined && "Må velge en type",
  questionDescription: (value) =>
    !(value.length > 0) && "Må skrive inn spørsmål",
  phase: (value) => value === 0 && "Må skrive inn fase",
  activeWeeks: (value: number[] | undefined) =>
    (value === undefined || value?.length === 0) && "Må velge minst én uke"
};
