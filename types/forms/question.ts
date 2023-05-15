import { Question, CreateQuestionFunction } from "@app/types";

export interface CreateQuestionForm {
  activeWeeks?: string[];
  relatedQuestionType: string;
  groupSize?: Question["groupSize"];
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

export interface EditQuestionForm {
  relatedQuestionType: Question["questionType"]["id"];
  groupSize?: Question["groupSize"];
  activeWeeks?: Question["activeWeeks"];
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
