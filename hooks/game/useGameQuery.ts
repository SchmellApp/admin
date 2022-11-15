import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Game } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useGameQuery = (id: string): QueryObserverResult<Game> =>
  useQuery(["game", id], async () => await schmellClient.game.get(id), {
    enabled: !(id === "")
  });

export default useGameQuery;
