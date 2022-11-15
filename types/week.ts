export interface Week {
  id: number;
  relatedGame: number;
  weekNumber: number;
}

export interface CreateWeek {
  relatedGame: number;
  weekNumber: number;
}
