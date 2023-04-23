import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryObserverResult, TaskPaginatedResponse } from "@app/types";

const useTodaysTasksQuery = (
  responsibleId: string
): QueryObserverResult<TaskPaginatedResponse> => {
  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 2 * 7);

  return useQuery({
    queryKey: ["tasks", "today", responsibleId],
    queryFn: async () =>
      await axios
        .get("/api/crm/tasks", {
          params: {
            responsibleUser: responsibleId,
            toDate
          }
        })
        .then((res) => res.data)
  });
};

export default useTodaysTasksQuery;
