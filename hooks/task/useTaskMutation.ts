import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskForm, MutationObserverResult, Task } from "@app/types";
import { task } from "@app/services";

const useTaskMutation = (): MutationObserverResult<Task, CreateTaskForm> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (createTask: CreateTaskForm) =>
      await task.taskService.createTask(createTask),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      }
    }
  );
};

export default useTaskMutation;
