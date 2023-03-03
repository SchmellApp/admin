import { GameStatus, IdeaCategory } from "@app/enums";
import { ContactFormType } from "@app/enums/contactForm";

export interface GameFilters {
  name?: string;
  status?: GameStatus;
}

export interface QuestionFilters {
  relatedWeek?: number;
}

export interface WeekFilters {
  relatedGame?: number;
}

export interface IdeaFilters {
  category?: IdeaCategory;
  createdBy?: number;
}

export interface TaskFilters {
  priority?: string;
  status?: string;
  category?: string;
  responsibleUser?: string;
  sort?: string;
}

export interface CommentFilters {
  relatedTask?: string;
}

export interface ContactFormFilters {
  type?: ContactFormType;
  email?: string;
  acceptedTerms?: boolean;
}
