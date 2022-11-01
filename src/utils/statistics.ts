import { StatisticsResponse } from "../types/api";
import { ActionElement, DayStatisticsRows } from "../types/ui/statistics";
import { TasksForToday } from "../types/statistics";
import { parseCategoryToUnderstandable } from "./category";
import { parsePriorityToBadge } from "./priority";

export const buildDayStatisticsRows = (
  countByGame: StatisticsResponse["questionsCount"]["countByGame"]
): DayStatisticsRows[] =>
  countByGame.map((obj) => ({
    gameName: obj.gameName,
    count: obj.count,
    income: obj.count,
    userCount: obj.count * 5
  }));

export const buildTasksByCategoryActions = (
  countByCategory: StatisticsResponse["taskCount"]["countByCategory"]
): ActionElement[] =>
  countByCategory.map((obj) => ({
    name: parseCategoryToUnderstandable(obj.category),
    right: obj.count,
    href: `/tasks?category=${obj.category}`
  }));

export const buildTasksForTodayActions = (
  tasksForToday: TasksForToday[]
): ActionElement[] =>
  tasksForToday.map((obj) => ({
    name: obj.title,
    right: parsePriorityToBadge(obj.priority),
    href: `/tasks/${obj.id}`
  }));
