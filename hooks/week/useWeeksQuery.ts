import { cms } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Week } from "@app/types";

const useWeeksQuery = (relatedGame: number): QueryObserverResult<Week[]> =>
  useQuery(
    ["week", relatedGame],
    async () => await cms.weekService.getWeeks({ relatedGame }),
    {
      enabled: !(relatedGame === 0)
    }
  );

export default useWeeksQuery;
