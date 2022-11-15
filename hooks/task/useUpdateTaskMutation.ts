import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MutationObserverResult, Task, UpdateTaskParams } from "@app/types";
import { task } from "@app/services";

const useUpdateTaskMutation = (
  id: string
): MutationObserverResult<Task, UpdateTaskParams> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updateTask: UpdateTaskParams) =>
      await task.taskService.updateTask(id, updateTask),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [id] });
      }
    }
  );
};

export default useUpdateTaskMutation;
