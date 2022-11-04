import { StatisticsResponse } from "@/types/api";
import { ActionElement, DayStatisticsRows } from "@/types/ui/statistics";
import { TasksForToday } from "@/types/statistics";
import { Badge } from "@mantine/core";
import React from "react";
import { getColor } from "./color";

export const toDayStatisticsRow = (
  countByGame: StatisticsResponse["questionsCount"]["countByGame"]
): DayStatisticsRows[] =>
  countByGame.map((obj) => ({
    gameName: obj.gameName,
    count: obj.count,
    income: obj.count,
    userCount: obj.count * 5
  }));

export const toCategoryActions = (
  countByCategory: StatisticsResponse["taskCount"]["countByCategory"]
): ActionElement[] =>
  countByCategory.map((obj) => ({
    name: obj.category,
    right: obj.count,
    href: `/tasks?category=${obj.category}`
  }));

export const toTodayActions = (
  tasksForToday: TasksForToday[]
): ActionElement[] =>
  tasksForToday.map((obj) => ({
    name: obj.title,
    right: (
      <Badge color={getColor(obj.priority)} size="lg">
        {obj.priority}
      </Badge>
    ),
    href: `/tasks/${obj.id}`
  }));
