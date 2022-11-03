export interface Question {
  id: number;
  relatedWeek: number;
  type: String;
  questionDescription: String;
  phase: number;
  function?: string;
  punishment: number;
  questionPicture?: string;
  relatedGame: number;
  questionPictureUrl?: string;
}
