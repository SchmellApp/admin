import { Task, User, Game } from "@app/types";

export interface CreateTaskForm {
  title: Task["title"];
  description: Task["description"];
  status?: Task["status"];
  deadline: Date;
  category: Task["category"];
  priority: Task["priority"];
  responsibleUser: User["id"];
  relatedGame?: Game["id"];
}

export interface EditTaskForm {
  status: Task["status"];
  deadline: Date;
  relatedGame?: string;
}
