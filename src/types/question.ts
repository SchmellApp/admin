export interface Question {
  id: number;
  relatedWeek: number;
  type: string;
  questionDescription: string;
  phase: number;
  function?: {};
  punishment: number;
  questionPicture?: string;
  relatedGame: number;
  questionPictureUrl?: string;
}

export interface EmptyQuestionJson
  extends Omit<Question, "id" | "questionPicture" | "questionPictureUrl"> {}
