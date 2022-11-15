import { userService } from "@app/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult, User } from "@app/types";

const useProfilePictureMutation = (
  id: string
): MutationObserverResult<User, File> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (file: File) => await userService.addProfilePicture(id, file),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useProfilePictureMutation;
