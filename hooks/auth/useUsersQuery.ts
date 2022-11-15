import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, User } from "@app/types";
import { userService } from "@app/services";

const useUsersQuery = (): QueryObserverResult<User[]> =>
  useQuery(["user"], userService.getUsers);

export default useUsersQuery;
