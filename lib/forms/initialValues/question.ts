import {
  CreateQuestionForm,
  EditQuestionForm,
  Game,
  Question
} from "@app/types";
import { toCommaSeparatedString } from "@app/utils";
import { GroupSize } from "@app/enums";
import { WeekNumbers } from "@app/constants";

export const createQuestionInitialValues = (
  relatedGame: Game["id"]
): CreateQuestionForm => ({
  relatedQuestionType: "0",
  questionDescription: "",
  phase: 0,
  punishment: undefined,
  relatedGame,
  file: undefined,
  timer: undefined,
  questions: undefined,
  answer: undefined,
  options: undefined,
  challenges: undefined,
  activeWeeks: WeekNumbers.map((week) => week.value),
  groupSize: GroupSize.All
});

export const editQuestionInitialValues = (
  question: Question
): EditQuestionForm => ({
  relatedQuestionType: question.questionType.id,
  activeWeeks: question.activeWeeks,
  groupSize: question.groupSize,
  questionDescription: question.questionDescription,
  phase: question.phase,
  punishment: question.punishment,
  file: undefined,
  timer: question.function?.timer ?? undefined,
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
