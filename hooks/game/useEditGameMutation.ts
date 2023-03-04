import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditGame } from "@app/types";
import axios from "axios";

const useEditGameMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: EditGame) =>
      await axios.patch(`/api/cms/game/${id}`, data).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["game", id] });
      }
    }
  );
};

export default useEditGameMutation;
