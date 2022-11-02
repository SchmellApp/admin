import { TaskCategory, TaskPriority, TaskStatus } from "../enums/task";
import { User } from "./user";
import { Game } from "./game";

export interface Task {
  id: number;
  createdDateTime: Date;
  title: string;
  description: string;
  status: TaskStatus;
  deadline: Date;
  category: TaskCategory;
  priority: TaskPriority;
  responsibleUser: User;
  relatedGame?: Game;
  lastUpdated: Date;
}
