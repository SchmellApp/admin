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

export interface ContactFormFilters {
  type?: string;
  email?: string;
  acceptedTerms?: boolean;
  page?: number;
  pageSize?: number;
}

export interface QuestionFilters {
  relatedGame: string;
  page?: number;
  pageSize?: number;
  questionType?: string;
  questionSearch?: string;
  hasDislikes?: boolean;
  dislikesGreaterThan?: number;
}
