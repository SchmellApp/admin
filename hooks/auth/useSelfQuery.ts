import { userService } from "@app/services";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { QueryObserverResult, User } from "@app/types";

const useSelfQuery = (): QueryObserverResult<User> => {
  const { user } = useUser();

  return useQuery({
    queryKey: ["self", user?.sub],
    queryFn: async () => await userService.getUserByAuth0ID(user?.sub ?? "")
  });
};

export default useSelfQuery;
