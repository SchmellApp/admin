import { useQuery } from "@tanstack/react-query";
import {
  QueryObserverResult,
  TaskFilters,
  TaskPaginatedResponse
} from "@app/types";
import axios from "axios";

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
      await axios
        .get("/api/tasks", {
          params: {
            priority,
            sort,
            status,
            responsibleUser,
            category,
            page,
            pageSize
          }
        })
        .then((res) => res.data)
  });

export default useTasksQuery;
