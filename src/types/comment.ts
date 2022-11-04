import { User } from "./user";

export interface Comment {
  id: number;
  createdDate: Date;
  comment: string;
  writtenBy: User;
  relatedTask: number;
}
