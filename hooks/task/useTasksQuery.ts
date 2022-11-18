import { useQuery } from "@tanstack/react-query";
import {
  QueryObserverResult,
  TaskFilters,
  TaskPaginatedResponse
} from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useTasksQuery = ({
  priority,
  sort,
  status,
  responsibleUser,
  category,
  page,
  pageSize
}: TaskFilters): QueryObserverResult<TaskPaginatedResponse> =>
  useQuery({
    queryKey: [
      "tasks",
      priority,
      sort,
      status,
      responsibleUser,
      category,
      page,
      pageSize
    ],
    queryFn: async () =>
      await schmellClient.task.getAll({
        priority,
        sort,
        status,
        responsibleUser,
        category,
        page,
        pageSize
      })
  });

export default useTasksQuery;
