import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateWeek, Week, MutationObserverResult } from "@app/types";
import axios from "axios";

const useWeekMutation = (
  relatedGame: string
): MutationObserverResult<Week, CreateWeek> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (week: CreateWeek) => await axios.post(`/api/cms/week`, week),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["week", relatedGame]);
      }
    }
  );
};

export default useWeekMutation;
