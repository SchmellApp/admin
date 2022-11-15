import { CreateCommentForm, User, Task } from "@app/types";

export const createCommentFormInitialValues = (
  writtenBy: User["id"],
  relatedTask: Task["id"]
): CreateCommentForm => ({
  comment: "",
  writtenBy,
  relatedTask
});
