import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, StatisticsResponse } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useGetStatisticsQuery = (): QueryObserverResult<StatisticsResponse> =>
  useQuery({
    queryKey: ["statistics"],
    queryFn: schmellClient.statistics.get
  });

export default useGetStatisticsQuery;
