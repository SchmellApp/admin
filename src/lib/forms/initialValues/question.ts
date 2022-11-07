import { Game } from "@/types/game";
import { Week } from "@/types/week";
import {
  CreateQuestionForm,
  CreateQuestionJsonForm,
  EditQuestionForm
} from "@/types/forms/question";
import { getEmptyJson } from "@/utils/question";
import { Question } from "@/types/question";

export const createQuestionInitialValues = (
  relatedGame: Game["id"],
  relatedWeek: Week["id"]
): CreateQuestionForm => ({
  type: "",
  questionDescription: "",
  phase: 0,
  function: "",
  punishment: 0,
  relatedWeek,
  relatedGame,
  questionPicture: undefined
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
  id: question.id,
  type: question.type,
  questionDescription: question.questionDescription,
  phase: question.phase,
  function: question.function,
  punishment: question.punishment,
  questionPicture: undefined
});
