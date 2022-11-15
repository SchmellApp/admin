import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cms } from "@app/services";
import { MutationObserverResult, AddGame, Game } from "@app/types";

const useGameMutation = (): MutationObserverResult<Game, AddGame> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cms.gameService.createGame,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["games"] });
    }
  });
};

export default useGameMutation;
