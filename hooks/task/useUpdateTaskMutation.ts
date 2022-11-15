import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTaskParams } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useUpdateTaskMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updateTask: UpdateTaskParams) =>
      await schmellClient.task.update(id, updateTask),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [id] });
      }
    }
  );
};

export default useUpdateTaskMutation;
