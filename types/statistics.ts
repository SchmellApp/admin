import { TaskCategory, TaskPriority } from "@app/enums";

export interface GameCount {
  count: number;
}

export interface QuestionsCount {
  totalCount: number;
  countByGame: Array<{
    gameId: number;
    gameName: string;
    count: number;
    amountOfSessions: number;
  }>;
}

export interface TaskCount {
  unsolved: number;
  overdue: number;
  countByCategory: Array<{
    category: TaskCategory;
    count: number;
  }>;
}

export interface DayStatistics {
  userCount: number;
  gamesPlayed: number;
}

export interface TasksForToday {
  id: number;
  title: string;
  priority: TaskPriority;
}
