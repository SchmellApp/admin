import { GameStatus, IdeaCategory } from "@app/enums";

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
