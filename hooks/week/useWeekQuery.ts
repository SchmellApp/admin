import { cms } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Week } from "@app/types";

const useWeekQuery = (weekId: number): QueryObserverResult<Week> =>
  useQuery(
    ["week", weekId],
    async () => await cms.weekService.getWeek(weekId),
    {
      enabled: !(weekId === 0)
    }
  );

export default useWeekQuery;
