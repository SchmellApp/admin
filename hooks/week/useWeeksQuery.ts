import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Week } from "@app/types";
import axios from "axios";

const useWeeksQuery = (relatedGame: string): QueryObserverResult<Week[]> =>
  useQuery(
    ["week", relatedGame],
    async () =>
      await axios
        .get(`/api/cms/week/?relatedGame=${relatedGame}`)
        .then((res) => res.data),
    {
      enabled: !(relatedGame === "")
    }
  );

export default useWeeksQuery;
