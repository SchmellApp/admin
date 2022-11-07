import { User } from "@/types/user";
import { EditUserForm } from "@/types/forms/user";

export const editUserInitialValues = (user: User): EditUserForm => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  profilePicture: user.profilePicture
});
