import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useProfilePictureMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (file: File) =>
      await axios.post(`/api/users/${id}/files/`, file).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["self"]);
      }
    }
  );
};

export default useProfilePictureMutation;
