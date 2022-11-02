import { Comment } from "../../../types/comment";
import { users } from "../users/user";

export const comments: Comment[] = [
  {
    id: 1,
    createdDate: new Date("2022-10-28T12:00:00.000Z"),
    comment: "Kommentar 1",
    writtenBy: users[1],
    relatedTask: 1
  },
  {
    id: 2,
    createdDate: new Date("2022-10-27T12:00:00.000Z"),
    comment: "Kommentar 2",
    writtenBy: users[0],
    relatedTask: 1
  },
  {
    id: 3,
    createdDate: new Date("2022-10-26T12:00:00.000Z"),
    comment: "Kommentar 3",
    writtenBy: users[1],
    relatedTask: 1
  },
  {
    id: 4,
    createdDate: new Date("2022-10-28T12:00:00.000Z"),
    comment: "Kommentar 1",
    writtenBy: users[1],
    relatedTask: 2
  },
  {
    id: 5,
    createdDate: new Date("2022-10-27T12:00:00.000Z"),
    comment: "Kommentar 2",
    writtenBy: users[0],
    relatedTask: 2
  },
  {
    id: 6,
    createdDate: new Date("2022-10-26T12:00:00.000Z"),
    comment: "Kommentar 3",
    writtenBy: users[1],
    relatedTask: 2
  },
  {
    id: 7,
    createdDate: new Date("2022-10-28T12:00:00.000Z"),
    comment: "Kommentar 1",
    writtenBy: users[1],
    relatedTask: 3
  },
  {
    id: 8,
    createdDate: new Date("2022-10-27T12:00:00.000Z"),
    comment: "Kommentar 2",
    writtenBy: users[0],
    relatedTask: 3
  },
  {
    id: 9,
    createdDate: new Date("2022-10-26T12:00:00.000Z"),
    comment: "Kommentar 3",
    writtenBy: users[1],
    relatedTask: 3
  },
  {
    id: 10,
    createdDate: new Date("2022-10-28T12:00:00.000Z"),
    comment: "Kommentar 1",
    writtenBy: users[1],
    relatedTask: 4
  },
  {
    id: 11,
    createdDate: new Date("2022-10-27T12:00:00.000Z"),
    comment: "Kommentar 2",
    writtenBy: users[0],
    relatedTask: 4
  },
  {
    id: 12,
    createdDate: new Date("2022-10-26T12:00:00.000Z"),
    comment: "Kommentar 3",
    writtenBy: users[1],
    relatedTask: 4
  },
  {
    id: 13,
    createdDate: new Date("2022-10-28T12:00:00.000Z"),
    comment: "Kommentar 1",
    writtenBy: users[1],
    relatedTask: 5
  },
  {
    id: 14,
    createdDate: new Date("2022-10-27T12:00:00.000Z"),
    comment: "Kommentar 2",
    writtenBy: users[0],
    relatedTask: 5
  },
  {
    id: 15,
    createdDate: new Date("2022-10-26T12:00:00.000Z"),
    comment: "Kommentar 3",
    writtenBy: users[1],
    relatedTask: 5
  }
];
