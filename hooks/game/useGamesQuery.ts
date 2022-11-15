import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Game } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useGamesQuery = (): QueryObserverResult<Game[]> =>
  useQuery({
    queryKey: ["games"],
    queryFn: schmellClient.game.getAll
  });

export default useGamesQuery;
