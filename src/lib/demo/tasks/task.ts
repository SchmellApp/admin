import { Task } from "../../../types/task";
import { TaskStatus } from "../../../types/task/status";
import { TaskCategory } from "../../../types/task/category";
import { TaskPriority } from "../../../types/task/priority";
import { users } from "../users/user";
import { games } from "../games/game";

export const tasks: Task[] = [
  {
    id: 1,
    createdDateTime: new Date("2022-11-02T12:00:00.000Z"),
    title: "Lag side for oppgaver",
    description: "Må fullføre side for oppgaver",
    status: TaskStatus.PENDING,
    deadline: new Date("2022-11-10"),
    category: TaskCategory.DEVELOPMENT,
    priority: TaskPriority.MEDIUM,
    responsibleUser: users[1],
    lastUpdated: new Date("2022-11-02T12:00:00.000Z")
  },
  {
    id: 2,
    createdDateTime: new Date("2022-10-18T12:00:00.000Z"),
    title: "Lag nytt design for app v2",
    description: "Fiks designet i Figma for app v2",
    status: TaskStatus.DOING,
    deadline: new Date("2022-12-10"),
    category: TaskCategory.DESIGN,
    priority: TaskPriority.LOW,
    responsibleUser: users[0],
    lastUpdated: new Date("2022-10-18T12:00:00.000Z")
  },
  {
    id: 3,
    createdDateTime: new Date("2022-10-18T12:00:00.000Z"),
    title: "Legg inn kostnader for Oktober",
    description: "Mangler kostnader for Railway",
    status: TaskStatus.DONE,
    deadline: new Date("2022-10-31"),
    category: TaskCategory.ECONOMY,
    priority: TaskPriority.HIGH,
    responsibleUser: users[1],
    lastUpdated: new Date("2022-10-25T12:00:00.000Z")
  },
  {
    id: 4,
    createdDateTime: new Date("2022-10-28T12:00:00.000Z"),
    title: "Legg til nye spørsmål",
    description: "Trenger nye spørsmål til start vorset",
    status: TaskStatus.PENDING,
    deadline: new Date("2022-11-15"),
    category: TaskCategory.GAMES,
    priority: TaskPriority.MEDIUM,
    responsibleUser: users[0],
    relatedGame: games[0],
    lastUpdated: new Date("2022-10-28T12:00:00.000Z")
  },
  {
    id: 5,
    createdDateTime: new Date("2022-11-01T12:00:00.000Z"),
    title: "Annonser for Snapchat",
    description: "Må lage annonser for Snapchat",
    status: TaskStatus.DOING,
    deadline: new Date("2022-11-15"),
    category: TaskCategory.MARKETING,
    priority: TaskPriority.HIGH,
    responsibleUser: users[0],
    lastUpdated: new Date("2022-11-01T12:00:00.000Z")
  }
];
