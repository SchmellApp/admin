import {
  CommentFilters,
  CreateCommentForm,
  Comment as CommentType
} from "@app/types";
import SchmellClient from "@app/client/client";

export default class Comment {
  client: SchmellClient;

  constructor(client: SchmellClient) {
    this.client = client;
  }

  getAll = async (filters: CommentFilters): Promise<CommentType[]> => {
    return await this.client.axiosInstance
      .get("/tasks/comment/", { params: filters })
      .then((res) => res.data);
  };

  create = async (comment: CreateCommentForm): Promise<CommentType> => {
    return await this.client.axiosInstance
      .post("/tasks/comment/", comment)
      .then((res) => res.data);
  };
}
