import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddGame } from "@app/types";
import axios from "axios";

const useGameMutation = () => {
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
