import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, StatisticsGeneralResponse } from "@app/types";
import axios from "axios";

const useGetStatisticsQuery =
  (): QueryObserverResult<StatisticsGeneralResponse> =>
    useQuery({
      queryKey: ["statistics"],
      queryFn: async () =>
        await axios
          .get("/api/common/statistics/general")
          .then((res) => res.data)
    });

export default useGetStatisticsQuery;
