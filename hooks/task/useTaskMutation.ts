import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTaskForm } from "@app/types";
import axios from "axios";

const useTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (createTask: CreateTaskForm) =>
      await axios.post("/api/tasks", createTask).then((res) => res.data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tasks"]);
      }
    }
  );
};

export default useTaskMutation;
