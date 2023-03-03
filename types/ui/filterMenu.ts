export interface TaskFilterMenu {
  priority: string[];
  status: string[];
  category: string[];
  responsible: string;
  page: number;
}

export interface ContactFilterMenu {
  acceptedTerms: boolean;
  type: string[];
  email: string;
  page: number;
}
