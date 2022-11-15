import { SimpleUser } from "./user";

export interface Comment {
  id: number;
  createdDate: string;
  comment: string;
  writtenBy: SimpleUser;
  relatedTask: number;
}
