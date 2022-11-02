import { TaskStatus } from "./task/status";
import { TaskCategory } from "./task/category";
import { TaskPriority } from "./task/priority";
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
