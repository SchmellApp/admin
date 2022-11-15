import { TaskCategory, TaskPriority, TaskStatus } from "@app/enums";
import React, { ReactNode } from "react";
import {
  IconAd,
  IconCashBanknote,
  IconCode,
  IconDeviceGamepad2,
  IconPalette,
  IconQuestionMark
} from "@tabler/icons";

export const getIcon = (category: TaskCategory): ReactNode => {
  switch (category) {
    case TaskCategory.DESIGN:
      return <IconPalette size={12} />;
    case TaskCategory.DEVELOPMENT:
      return <IconCode size={12} />;
    case TaskCategory.GAMES:
      return <IconDeviceGamepad2 size={12} />;
    case TaskCategory.MARKETING:
      return <IconAd size={12} />;
    case TaskCategory.ECONOMY:
      return <IconCashBanknote size={12} />;
    default:
      return <IconQuestionMark size={12} />;
  }
};

export const toCategoryString = (category: TaskCategory): string => {
  switch (category) {
    case TaskCategory.DESIGN:
      return "Design";
    case TaskCategory.DEVELOPMENT:
      return "Utvikling";
    case TaskCategory.GAMES:
      return "Spill";
    case TaskCategory.MARKETING:
      return "Markedsføring";
    case TaskCategory.ECONOMY:
      return "Økonomi";
    default:
      return "Unknown";
  }
};

export const toPriorityString = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return "Lav";
    case TaskPriority.MEDIUM:
      return "Medium";
    case TaskPriority.HIGH:
      return "Høy";
  }
};

export const toStatusString = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return "Ikke startet";
    case TaskStatus.DOING:
      return "Pågår";
    case TaskStatus.DONE:
      return "Ferdig";
  }
};
