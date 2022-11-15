import { User } from "@app/types";

export interface EditUserForm {
  email: User["email"];
  phoneNumber: User["phoneNumber"];
  firstName: User["firstName"];
  lastName: User["lastName"];
  file?: File;
}
