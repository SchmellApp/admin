import { Question } from "@/types/question";

export interface CreateQuestionForm
  extends Omit<Question, "questionPictureUrl" | "id"> {}

export interface CreateQuestionJsonForm {
  json: string;
}

export interface EditQuestionForm
  extends Omit<Question, "questionPictureUrl" | "relatedGame" | "relatedWeek" | "questionPicture"> {
  questionPicture: File | undefined;
}
