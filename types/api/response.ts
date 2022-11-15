import {
  GameCount,
  QuestionsCount,
  TaskCount,
  UserCount
} from "@app/types/statistics";

export interface StatisticsResponse {
  userCount: UserCount;
  gameCount: GameCount;
  questionsCount: QuestionsCount;
  taskCount: TaskCount;
}
