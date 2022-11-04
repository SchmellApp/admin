import { StatisticsResponse } from "@/types/api";
import { TaskCategory, TaskPriority } from "@/enums/task";
import { TasksForToday } from "@/types/statistics";

export const dayStatistics: StatisticsResponse = {
  userCount: {
    count: 2
  },
  gameCount: {
    count: 5
  },
  questionsCount: {
    totalCount: 2404,
    countByGame: [
      {
        count: 9,
        gameId: 1,
        gameName: "Date night"
      },
      {
        count: 1502,
        gameId: 2,
        gameName: "Start Vorset"
      },
      {
        count: 820,
        gameId: 3,
        gameName: "Gjengen"
      },
      {
        count: 70,
        gameId: 4,
        gameName: "Mamma, beklager"
      },
      {
        count: 3,
        gameId: 5,
        gameName: "Haloween"
      }
    ]
  },
  taskCount: {
    overdue: 4,
    unsolved: 8,
    countByCategory: [
      {
        count: 4,
        category: TaskCategory.DEVELOPMENT
      },
      {
        count: 18,
        category: TaskCategory.GAMES
      },
      {
        count: 1,
        category: TaskCategory.DESIGN
      }
    ]
  }
};

// TODO: In backend: Create endpoint for retrieving tasks for today
export const tasksForToday: TasksForToday[] = [
  {
    id: 22,
    title: "Lag side for oppgaver",
    priority: TaskPriority.MEDIUM
  },
  {
    id: 18,
    title: "Lag nytt design for app v2",
    priority: TaskPriority.LOW
  },
  {
    id: 34,
    title: "Fix bug i app",
    priority: TaskPriority.HIGH
  },
  {
    id: 12,
    title: "Lag nytt design for admin v3",
    priority: TaskPriority.LOW
  }
];
