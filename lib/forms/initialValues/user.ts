import { User, EditUserForm } from "@app/types";

export const editUserInitialValues = (user: User): EditUserForm => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  file: undefined
});
