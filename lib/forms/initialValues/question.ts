import {
  Game,
  Week,
  CreateQuestionForm,
  CreateQuestionJsonForm,
  EditQuestionForm,
  Question
} from "@app/types";
import { getEmptyJson } from "@app/utils";

export const createQuestionInitialValues = (
  relatedGame: Game["id"],
  relatedWeek: Week["id"]
): CreateQuestionForm => ({
  type: "",
  questionDescription: "",
  phase: 0,
  function: undefined,
  punishment: 0,
  relatedWeek,
  relatedGame,
  file: undefined
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
  function: question.function,
  punishment: question.punishment,
  file: undefined
});
