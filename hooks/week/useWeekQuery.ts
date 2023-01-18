import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Week } from "@app/types";
import axios from "axios";

const useWeekQuery = (weekId: string): QueryObserverResult<Week> =>
  useQuery(
    ["week", weekId],
    async () =>
      await axios.get(`/api/cms/week/${weekId}`).then((res) => res.data),
    {
      enabled: !(weekId === "")
    }
  );

export default useWeekQuery;
