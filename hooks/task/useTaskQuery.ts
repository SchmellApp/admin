import { task } from "@app/services";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Task } from "@app/types";

const useTaskQuery = (id: string): QueryObserverResult<Task> =>
  useQuery(["task", id], async () => await task.taskService.getTask(id));

export default useTaskQuery;
