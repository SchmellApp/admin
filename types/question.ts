export interface Question {
  id: number;
  relatedWeek: number;
  type: string;
  questionDescription: string;
  phase: number;
  function?: string;
  punishment: number;
  questionPicture?: string;
  relatedGame: number;
  questionPictureUrl?: string;
}

export interface EmptyQuestionJson
  extends Omit<Question, "id" | "questionPicture" | "questionPictureUrl"> {}

export interface CreateQuestion
  extends Omit<Question, "id" | "questionPicture" | "questionPictureUrl"> {}

export interface UpdateQuestion
  extends Omit<CreateQuestion, "relatedGame" | "relatedWeek"> {}
