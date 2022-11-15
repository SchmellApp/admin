import { cms } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Game } from "@app/types";

const useGameQuery = (id: number): QueryObserverResult<Game> =>
  useQuery(["game", id], async () => await cms.gameService.getGame(id), {
    enabled: !(id === 0)
  });

export default useGameQuery;
