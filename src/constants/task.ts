import { TaskCategory, TaskPriority, TaskStatus } from "../enums/task";

export const TASK_STATUS = [
  {
    label: "Ikke startet",
    value: TaskStatus.PENDING,
    color: "yellow"
  },
  {
    label: "Pågår",
    value: TaskStatus.DOING,
    color: "yellow"
  },
  {
    label: "Ferdig",
    value: TaskStatus.DONE,
    color: "yellow"
  }
];

export const TASK_CATEGORY = [
  {
    label: "Spill",
    value: TaskCategory.GAMES,
    color: "yellow"
  },
  {
    label: "Design",
    value: TaskCategory.DESIGN,
    color: "yellow"
  },
  {
    label: "Utvikling",
    value: TaskCategory.DEVELOPMENT,
    color: "yellow"
  },
  {
    label: "Økonomi",
    value: TaskCategory.ECONOMY,
    color: "yellow"
  },
  {
    label: "Markedsføring",
    value: TaskCategory.MARKETING,
    color: "yellow"
  }
];

export const TASK_PRIORITY = [
  {
    label: "Lav",
    value: TaskPriority.LOW,
    color: "yellow"
  },
  {
    label: "Medium",
    value: TaskPriority.MEDIUM,
    color: "yellow"
  },
  {
    label: "Høy",
    value: TaskPriority.HIGH,
    color: "yellow"
  }
];
