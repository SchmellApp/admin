import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Week } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useWeeksQuery = (relatedGame: string): QueryObserverResult<Week[]> =>
  useQuery(
    ["week", relatedGame],
    async () => await schmellClient.week.getAll({ relatedGame }),
    {
      enabled: !(relatedGame === "")
    }
  );

export default useWeeksQuery;
