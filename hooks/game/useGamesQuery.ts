import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Game } from "@app/types";
import axios from "axios";

const useGamesQuery = (): QueryObserverResult<Game[]> =>
  useQuery({
    queryKey: ["games"],
    queryFn: async () =>
      await axios.get("/api/cms/game").then((res) => res.data)
  });

export default useGamesQuery;
