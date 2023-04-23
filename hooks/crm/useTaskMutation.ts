import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskForm, MutationObserverResult, Task } from "@app/types";
import axios from "axios";

const useTaskMutation = (): MutationObserverResult<Task, CreateTaskForm> => {
  const queryClient = useQueryClient();

  return useMutation(
    async (createTask: CreateTaskForm) =>
      await axios.post("/api/crm/tasks", createTask).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      }
    }
  );
};

export default useTaskMutation;
