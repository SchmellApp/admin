import {
  Game,
  Week,
  CreateQuestionForm,
  CreateQuestionJsonForm,
  EditQuestionForm,
  Question
} from "@app/types";
import { getEmptyJson, toCommaSeparatedString } from "@app/utils";

export const createQuestionInitialValues = (
  relatedGame: Game["id"],
  relatedWeek: Week["id"]
): CreateQuestionForm => ({
  type: "",
  questionDescription: "",
  phase: 0,
  punishment: 0,
  relatedWeek,
  relatedGame,
  file: undefined,
  timer: undefined,
  questions: undefined,
  answer: undefined,
  options: undefined,
  challenges: undefined
});

export const createQuestionJsonInitialValues = (
  relatedGame: Game["id"],
  relatedWeek: Week["id"]
): CreateQuestionJsonForm => ({
  json: JSON.stringify(getEmptyJson(relatedWeek, relatedGame), null, 2)
});

export const editQuestionInitialValues = (
  question: Question
): EditQuestionForm => ({
  type: question.type,
  questionDescription: question.questionDescription,
  phase: question.phase,
  punishment: question.punishment,
  file: undefined,
  timer: question.function?.timer,
  answer: question.function?.answer,
  questions:
    question.function?.questions != null &&
    question.function?.questions?.length > 0
      ? toCommaSeparatedString(question.function?.questions)
      : undefined,
  options:
    question.function?.options != null && question.function?.options.length > 0
      ? toCommaSeparatedString(question.function?.options)
      : undefined,
  challenges:
    question.function?.challenges != null &&
    question.function?.challenges.length > 0
      ? toCommaSeparatedString(question.function?.challenges)
      : undefined
});
