import { common } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, StatisticsResponse } from "@app/types";

const useGetStatisticsQuery = (): QueryObserverResult<StatisticsResponse> =>
  useQuery({
    queryKey: ["statistics"],
    queryFn: common.statisticService.getStatistics
  });

export default useGetStatisticsQuery;
