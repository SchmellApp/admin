import { useQuery } from "@tanstack/react-query";
import { schmellClient } from "@app/pages/_app";

const useTodaysTasksQuery = (responsibleId: string) => {
  const toDate = new Date();
  toDate.setDate(toDate.getDate() + 2 * 7);

  return useQuery({
    queryKey: ["tasks", "today", responsibleId],
    queryFn: async () =>
      await schmellClient.task.getAll({
        responsibleUser: responsibleId,
        toDate
      })
  });
};

export default useTodaysTasksQuery;
