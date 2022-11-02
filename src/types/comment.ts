import { User } from "./user";

export interface Comment {
  id: number;
  createdDate: Date;
  comment: String;
  writtenBy: User;
  relatedTask: number;
}
