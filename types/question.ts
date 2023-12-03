import { QuestionFunction } from "@app/types/questionFunction";
import { GroupSize } from "@app/enums/question";
import { QuestionType } from "@app/types/questionType";

export interface Question {
  id: number;
  activeWeeks: number[];
  questionDescription: string;
  phase: number;
  function?: QuestionFunction;
  punishment?: number;
  questionPicture?: string;
  relatedGame: number;
  questionPictureUrl?: string;
  questionType: QuestionType;
  groupSize: GroupSize;
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
    | "activeWeeks"
    | "groupSize"
  > {
  function?: Omit<QuestionFunction, "id">;
  relatedQuestionType: QuestionType["id"];
  activeWeeks?: number[];
  groupSize?: GroupSize;
}

export interface EmptyQuestionJson extends CreateQuestion {}

export interface UpdateQuestion extends Omit<CreateQuestion, "relatedGame"> {}
