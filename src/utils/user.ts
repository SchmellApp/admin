import { User } from "../types/user";
import { users } from "../lib/demo/users/user";

export const getFullName = (id: User["id"]): string => {
  const user = users.find((user) => user.id === id);

  return user != null ? `${user.firstName} ${user.lastName}` : "";
};
