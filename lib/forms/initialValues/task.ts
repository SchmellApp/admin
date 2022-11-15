import { CreateTaskForm, EditTaskForm, Task } from "@app/types";
import { TaskCategory, TaskPriority, TaskStatus } from "@app/enums";

export const createTaskInitialValues: CreateTaskForm = {
  title: "",
  description: "",
  status: "" as TaskStatus,
  deadline: new Date(),
  category: "" as TaskCategory,
  priority: TaskPriority.MEDIUM,
  responsibleUser: 0,
  relatedGame: undefined
};

export const editTaskInitialValues = (task: Task): EditTaskForm => ({
  status: task.status,
  deadline: new Date(task.deadline),
  relatedGame: String(task.relatedGame?.id)
});
