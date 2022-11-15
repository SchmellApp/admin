import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schmellClient } from "@app/pages/_app";

const useProfilePictureMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (file: File) => await schmellClient.user.addProfilePicture(id, file),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useProfilePictureMutation;
