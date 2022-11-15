import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddGame } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useGameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (game: AddGame) => await schmellClient.game.create(game),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["games"] });
    }
  });
};

export default useGameMutation;
