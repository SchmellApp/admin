import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddGame, Game, MutationObserverResult } from "@app/types";
import axios from "axios";

const useGameMutation = (): MutationObserverResult<Game, AddGame> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (game: AddGame) =>
      await axios.post("/api/cms/game", game).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["games"] });
    }
  });
};

export default useGameMutation;
