import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskForm } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (createTask: CreateTaskForm) =>
      await schmellClient.task.create(createTask),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      }
    }
  );
};

export default useTaskMutation;
