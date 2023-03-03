export interface QuestionFunction {
  id: number;
  timer?: number;
  answer?: string;
  challenges?: string[];
  questions?: string[];
  options?: string[];
}

export interface CreateQuestionFunction {
  timer?: number;
  answer?: string;
  challenges?: string;
  questions?: string;
  options?: string;
}
