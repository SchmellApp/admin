import { task } from "@app/services";
import { useQuery } from "@tanstack/react-query";

const useTodaysTasksQuery = (responsibleId: string) =>
  useQuery({
    queryKey: ["tasks", "today", responsibleId],
    queryFn: async () => await task.taskService.getTasksForToday(responsibleId)
  });

export default useTodaysTasksQuery;
