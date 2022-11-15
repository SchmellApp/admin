import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, User } from "@app/types";
import { schmellClient } from "@app/pages/_app";

const useUsersQuery = (): QueryObserverResult<User[]> =>
  useQuery(["user"], schmellClient.user.getAll);

export default useUsersQuery;
