import {
  ActionElement,
  DayStatisticsRows,
  Task,
  StatisticsGeneralResponse,
  DayStatistics
} from "@app/types";
import { Badge } from "@mantine/core";
import React from "react";
import { getColor } from "./color";
import { toCategoryString, toPriorityString } from "@app/utils/task";

export const toDayStatisticsRow = (
  countByGame: StatisticsGeneralResponse["questionsCount"]["countByGame"]
): DayStatisticsRows[] =>
  countByGame.map((obj) => ({
    gameName: obj.gameName,
    count: obj.count,
    userCount: obj.amountOfSessions
  }));

export const toCategoryActions = (
  countByCategory: StatisticsGeneralResponse["taskCount"]["countByCategory"]
): ActionElement[] =>
  countByCategory.map((obj) => ({
    name: toCategoryString(obj.category),
    right: obj.count,
    href: `/tasks?category=${obj.category}`
  }));

export const toTodayActions = (tasksForToday: Task[]): ActionElement[] =>
  tasksForToday.map((obj) => ({
    name: obj.title,
    right: (
      <Badge color={getColor(obj.priority)} size="lg">
        {toPriorityString(obj.priority)}
      </Badge>
    ),
    href: `/tasks/${obj.id}`
  }));

export const toDayStatisticsCards = (dayStatistics: DayStatistics) => {};
