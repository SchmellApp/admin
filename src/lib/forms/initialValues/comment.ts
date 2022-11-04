import { CreateCommentForm } from "@/types/forms/comment";
import { User } from "@/types/user";
import { Task } from "@/types/task";

export const createCommentFormInitialValues = (
  writtenBy: User,
  relatedTask: Task["id"]
): CreateCommentForm => ({
  comment: "",
  writtenBy,
  relatedTask
});
