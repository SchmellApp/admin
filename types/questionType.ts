export interface QuestionType {
  id: number;
  name: string;
  hexColor: string;
  hint: string;
}

export interface CreateQuestionType extends Omit<QuestionType, "id"> {}
export interface UpdateQuestionType {
  name?: string;
  hexColor?: string;
  hint?: string;
}
