import { User } from "@/types/user";

export interface EditUserForm
  extends Pick<
    User,
    "id" | "profilePicture" | "phoneNumber" | "email" | "firstName" | "lastName"
  > {}
