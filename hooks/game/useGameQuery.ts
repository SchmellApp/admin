import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Game } from "@app/types";
import axios from "axios";

const useGameQuery = (id: string): QueryObserverResult<Game> =>
  useQuery(
    ["game", id],
    async () => await axios.get(`/api/cms/game/${id}/`).then((res) => res.data),
    {
      enabled: !(id === "") && id !== undefined
    }
  );

export default useGameQuery;
