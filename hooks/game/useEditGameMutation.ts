import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditGame, Game, MutationObserverResult } from "@app/types";
import { cms } from "@app/services";

const useEditGameMutation = (
  id: number
): MutationObserverResult<Game, EditGame> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: EditGame) => await cms.gameService.updateGame(id, data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["game", id] });
      }
    }
  );
};

export default useEditGameMutation;
