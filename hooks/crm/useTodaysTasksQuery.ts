import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QueryObserverResult, TaskPaginatedResponse } from "@app/types";
import { TaskStatus } from "@app/enums";

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
            toDate,
            status: `${TaskStatus.PENDING}+${TaskStatus.DOING}`
          }
        })
        .then((res) => res.data)
  });
};

export default useTodaysTasksQuery;
