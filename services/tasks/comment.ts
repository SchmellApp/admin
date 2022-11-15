import { CommentFilters, CreateCommentForm } from "@app/types";
import axiosInstance from "../axios";

export const getComments = async (
  filters: CommentFilters
): Promise<Comment[]> =>
  await axiosInstance
    .get("/tasks/comment/", { params: filters })
    .then((res) => res.data);

export const createComment = async (
  comment: CreateCommentForm
): Promise<Comment> =>
  await axiosInstance.post("/tasks/comment/", comment).then((res) => res.data);
