import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schmellClient } from "@app/pages/_app";

const useQuestionFileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, file }: { id: string; file: File }) =>
      await schmellClient.question.addPicture(id, file),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["questions"]);
      }
    }
  );
};

export default useQuestionFileMutation;
