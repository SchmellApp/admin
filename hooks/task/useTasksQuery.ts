import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Task, TaskFilters } from "@app/types";
import { task } from "@app/services";

const useTasksQuery = ({
  priority,
  sort,
  status,
  responsibleUser,
  category
}: TaskFilters): QueryObserverResult<Task[]> =>
  useQuery({
    queryKey: ["tasks", priority, sort, status, responsibleUser, category],
    queryFn: async () =>
      await task.taskService.getTasks({
        priority,
        sort,
        status,
        responsibleUser,
        category
      })
  });

export default useTasksQuery;
