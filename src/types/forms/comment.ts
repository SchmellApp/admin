import { Comment } from "@/types/comment";

export interface CreateCommentForm
  extends Omit<Comment, "id" | "createdDate"> {}
