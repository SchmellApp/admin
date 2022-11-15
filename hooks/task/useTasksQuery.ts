import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Task, TaskFilters } from "@app/types";
import { schmellClient } from "@app/pages/_app";

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
      await schmellClient.task.getAll({
        priority,
        sort,
        status,
        responsibleUser,
        category
      })
  });

export default useTasksQuery;
