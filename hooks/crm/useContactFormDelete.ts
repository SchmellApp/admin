import { MutationObserverResult } from "@app/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useContactFormDelete = (): MutationObserverResult<void, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      await axios.delete(`/api/crm/contact/${id}`).then((res) => res.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["contactForms"] });
    }
  });
};

export default useContactFormDelete;
