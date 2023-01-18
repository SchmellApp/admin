import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, StatisticsResponse } from "@app/types";
import axios from "axios";

const useGetStatisticsQuery = (): QueryObserverResult<StatisticsResponse> =>
  useQuery({
    queryKey: ["statistics"],
    queryFn: async () =>
      await axios.get("/api/common/statistics").then((res) => res.data)
  });

export default useGetStatisticsQuery;
