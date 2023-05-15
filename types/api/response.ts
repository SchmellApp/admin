import {
  DayStatistics,
  GameCount,
  QuestionsCount,
  TaskCount
} from "@app/types/statistics";

export interface StatisticsGeneralResponse {
  dayStatistics: DayStatistics;
  gameCount: GameCount;
  questionsCount: QuestionsCount;
  taskCount: TaskCount;
}
export interface StatisticsOverviewResponse {}
