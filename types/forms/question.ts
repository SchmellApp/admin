import { Question } from "@app/types";

export interface CreateQuestionForm {
  relatedWeek: Question["relatedWeek"];
  type: Question["type"];
  questionDescription: Question["questionDescription"];
  phase: Question["phase"];
  function?: Question["function"];
  punishment: Question["punishment"];
  relatedGame: Question["relatedGame"];
  file?: File;
}

export interface CreateQuestionJsonForm {
  json: string;
}

export interface EditQuestionForm {
  type: Question["type"];
  questionDescription: Question["questionDescription"];
  phase: Question["phase"];
  function?: Question["function"];
  punishment: Question["punishment"];
  file?: File;
}
