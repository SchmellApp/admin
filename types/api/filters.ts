export interface QuestionFilters {
  relatedWeek?: string;
}

export interface WeekFilters {
  relatedGame?: string;
}

export interface TaskFilters {
  priority?: string;
  status?: string;
  category?: string;
  responsibleUser?: string;
  sort?: string;
  toDate?: Date;
  page?: number;
  pageSize?: number;
}

export interface CommentFilters {
  relatedTask?: string;
}

export interface ContactFormFilters {
  type?: ContactFormType;
  email?: string;
  acceptedTerms?: boolean;
}
