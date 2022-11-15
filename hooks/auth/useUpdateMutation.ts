import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditUser, MutationObserverResult, User } from "@app/types";
import { userService } from "@app/services";

const useUpdateMutation = (
  id: string
): MutationObserverResult<User, EditUser> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (user: EditUser) => await userService.updateUser(id, user),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useUpdateMutation;
