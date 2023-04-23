import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditUser, MutationObserverResult, User } from "@app/types";
import axios from "axios";

const useUpdateMutation = (
  id: string
): MutationObserverResult<User, EditUser> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (user: EditUser) =>
      await axios.patch(`/api/users/${id}`, user).then((res) => res.data),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useUpdateMutation;
