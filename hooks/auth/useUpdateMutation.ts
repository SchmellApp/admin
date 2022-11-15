import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditUser } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useUpdateMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (user: EditUser) => await schmellClient.user.update(id, user),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useUpdateMutation;
