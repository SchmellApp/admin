import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult } from "@app/types";
import axios from "axios";

const useIdeaDelete = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) =>
      await axios.delete(`/api/common/idea/${id}`).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["ideas"] });
    }
  });
};

export default useIdeaDelete;
