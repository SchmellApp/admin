import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Week } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useWeekQuery = (weekId: string): QueryObserverResult<Week> =>
  useQuery(["week", weekId], async () => await schmellClient.week.get(weekId), {
    enabled: !(weekId === "")
  });

export default useWeekQuery;
