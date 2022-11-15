import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, Task } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useTaskQuery = (id: string): QueryObserverResult<Task> =>
  useQuery(["task", id], async () => await schmellClient.task.get(id));

export default useTaskQuery;
