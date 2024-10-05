import { QuestionFunction } from "@app/types/questionFunction";
import { QuestionType } from "@app/types/questionType";

export interface Question {
  id: number;
  questionDescription: string;
  phase: number;
  function?: QuestionFunction;
  punishment?: number;
  questionPicture?: string;
  relatedGame: number;
  questionPictureUrl?: string;
  questionType: QuestionType;
  dislikesCount: number;
}

export interface QuestionPaginatedResponse {
  questions: Question[];
  total: number;
  page: number;
  lastPage: number;
}

export interface CreateQuestion
  extends Omit<
    Question,
    | "id"
    | "questionPicture"
    | "questionPictureUrl"
    | "function"
    | "questionType"
    | "dislikesCount"
  > {
  function?: Omit<QuestionFunction, "id">;
  relatedQuestionType: QuestionType["id"];
}

export interface UpdateQuestion extends Omit<CreateQuestion, "relatedGame"> {}
