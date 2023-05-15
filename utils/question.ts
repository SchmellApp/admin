import {
  CreateQuestionForm,
  CreateQuestion,
  EditQuestionForm,
  UpdateQuestion
} from "@app/types";
import { GroupSize } from "@app/enums";

export const toCreateQuestion = (
  values: CreateQuestionForm
): CreateQuestion => {
  return {
    relatedQuestionType: Number(values.relatedQuestionType),
    activeWeeks: values.activeWeeks?.map((week) => Number(week)),
    groupSize: values.groupSize,
    questionDescription: values.questionDescription,
    phase: values.phase,
    function: functionValues(values),
    punishment: values.punishment,
    relatedGame: values.relatedGame
  };
};

export const toUpdateQuestion = (values: EditQuestionForm): UpdateQuestion => {
  return {
    relatedQuestionType: Number(values.relatedQuestionType),
    activeWeeks: values.activeWeeks?.map((week) => Number(week)),
    groupSize: values.groupSize,
    questionDescription: values.questionDescription,
    phase: values.phase,
    function: functionValues(values),
    punishment: values.punishment
  };
};

const commaSeparatedToArray = (value?: string): string[] | undefined =>
  value !== undefined ? value.split(",").map((item) => item.trim()) : undefined;

export const toCommaSeparatedString = (values: string[]): string =>
  values.join(", ");

const assertSomeValuesDefined = (
  values: CreateQuestionForm | EditQuestionForm
): boolean => {
  return (
    values.questions !== undefined ||
    values.options !== undefined ||
    values.answer !== undefined ||
    values.timer !== undefined ||
    values.challenges !== undefined
  );
};

const functionValues = (
  values: CreateQuestionForm | EditQuestionForm
): CreateQuestion["function"] | undefined => {
  if (assertSomeValuesDefined(values)) {
    return {
      questions: commaSeparatedToArray(values.questions),
      options: commaSeparatedToArray(values.options),
      answer: values.answer,
      timer: values.timer,
      challenges: commaSeparatedToArray(values.challenges)
    };
  }
};

export const getWeekString = (weeks: number[]): string =>
  weeks.length === 52
    ? "Alle uker"
    : weeks.map((week) => `Uke ${week}`).join(", ");
export const toUnderstandableGroupSize = {
  [GroupSize.All]: "Alle",
  [GroupSize.S]: "Liten (0-8)",
  [GroupSize.M]: "Middels (9-16)",
  [GroupSize.L]: "Stor (17 og oppover)"
};
