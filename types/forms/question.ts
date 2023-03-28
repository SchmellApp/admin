import { Question } from "@app/types";
import { CreateQuestionFunction } from "@app/types/questionFunction";

export interface CreateQuestionForm {
  relatedWeek: Question["relatedWeek"];
  type: Question["type"];
  questionDescription: Question["questionDescription"];
  phase: Question["phase"];
  punishment?: Question["punishment"];
  relatedGame: Question["relatedGame"];
  file?: File;
  timer?: CreateQuestionFunction["timer"];
  answer?: CreateQuestionFunction["answer"];
  challenges?: CreateQuestionFunction["challenges"];
  questions?: CreateQuestionFunction["questions"];
  options?: CreateQuestionFunction["options"];
}

export interface CreateQuestionJsonForm {
  json: string;
}

export interface EditQuestionForm {
  type: Question["type"];
  questionDescription: Question["questionDescription"];
  phase: Question["phase"];
  punishment: Question["punishment"];
  file?: File;
  timer?: CreateQuestionFunction["timer"];
  answer?: CreateQuestionFunction["answer"];
  challenges?: CreateQuestionFunction["challenges"];
  questions?: CreateQuestionFunction["questions"];
  options?: CreateQuestionFunction["options"];
}
