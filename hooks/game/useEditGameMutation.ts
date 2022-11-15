import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditGame } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useEditGameMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: EditGame) => await schmellClient.game.update(id, data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["game", id] });
      }
    }
  );
};

export default useEditGameMutation;
