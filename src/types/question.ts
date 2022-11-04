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
