import { QuestionType } from "@app/types";

export interface CreateQuestionTypeForm {
  name: QuestionType["name"];
  hexColor: QuestionType["hexColor"];
  hint: QuestionType["hint"];
}

export interface EditQuestionTypeForm {
  name?: QuestionType["name"];
  hexColor?: QuestionType["hexColor"];
  hint?: QuestionType["hint"];
}
