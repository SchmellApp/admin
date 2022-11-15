import { Comment } from "@app/types";

export interface CreateCommentForm {
  comment: Comment["comment"];
  writtenBy: number;
  relatedTask: number;
}
