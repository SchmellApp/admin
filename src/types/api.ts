import { GameCount, QuestionsCount, TaskCount, UserCount } from "./statistics";

export interface StatisticsResponse {
  userCount: UserCount;
  gameCount: GameCount;
  questionsCount: QuestionsCount;
  taskCount: TaskCount;
}
