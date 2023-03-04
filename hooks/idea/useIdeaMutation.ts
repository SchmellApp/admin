import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult, IdeaForm, Idea } from "@app/types";
import axios from "axios";

const useIdeaMutation = (): MutationObserverResult<Idea, IdeaForm> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: IdeaForm) =>
      await axios.post("/api/common/idea", values).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }
  });
};

export default useIdeaMutation;
