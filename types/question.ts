import { QuestionFunction } from "@app/types/questionFunction";

export interface Question {
  id: number;
  relatedWeek: number;
  type: string;
  questionDescription: string;
  phase: number;
  function?: QuestionFunction;
  punishment: number;
  questionPicture?: string;
  relatedGame: number;
  questionPictureUrl?: string;
}

export interface CreateQuestion
  extends Omit<
    Question,
    "id" | "questionPicture" | "questionPictureUrl" | "function"
  > {
  function: Omit<QuestionFunction, "id">;
}

export interface EmptyQuestionJson extends CreateQuestion {}

export interface UpdateQuestion
  extends Omit<CreateQuestion, "relatedGame" | "relatedWeek"> {}
