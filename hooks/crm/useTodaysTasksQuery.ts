import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTodaysTasksQuery = (responsibleId: string) => {
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
