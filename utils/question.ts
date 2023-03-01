import {
  Week,
  Game,
  EmptyQuestionJson,
  CreateQuestionForm,
  CreateQuestion,
  EditQuestionForm,
  UpdateQuestion
} from "@app/types";

export const getEmptyJson = (
  relatedWeek: Week["id"],
  relatedGame: Game["id"]
): EmptyQuestionJson[] => [
  {
    type: "",
    questionDescription: "",
    phase: 0,
    function: {},
    punishment: 0,
    relatedWeek,
    relatedGame
  }
];

export const toCreateQuestion = (
  values: CreateQuestionForm
): CreateQuestion => {
  return {
    type: values.type,
    questionDescription: values.questionDescription,
    phase: values.phase,
    function: {
      questions: commaSeparatedToArray(values.questions),
      options: commaSeparatedToArray(values.options),
      answer: values.answer,
      timer: values.timer,
      challenges: commaSeparatedToArray(values.challenges)
    },
    punishment: values.punishment,
    relatedGame: values.relatedGame,
    relatedWeek: values.relatedWeek
  };
};

export const toUpdateQuestion = (values: EditQuestionForm): UpdateQuestion => {
  return {
    type: values.type,
    questionDescription: values.questionDescription,
    phase: values.phase,
    function: {
      questions: commaSeparatedToArray(values.questions),
      options: commaSeparatedToArray(values.options),
      answer: values.answer,
      timer: values.timer,
      challenges: commaSeparatedToArray(values.challenges)
    },
    punishment: values.punishment
  };
};

const commaSeparatedToArray = (value?: string): string[] | undefined =>
  value !== undefined ? value.split(",").map((item) => item.trim()) : undefined;

export const toCommaSeparatedString = (values: string[]): string =>
  values.join(", ");
