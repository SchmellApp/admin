import { cms } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Game } from "@app/types";

const useGamesQuery = (): QueryObserverResult<Game[]> =>
  useQuery({
    queryKey: ["games"],
    queryFn: cms.gameService.getGames
  });

export default useGamesQuery;
