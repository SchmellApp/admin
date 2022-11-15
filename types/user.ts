export interface User {
  id: number;
  email: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  alertsForTasks: boolean;
  alertsForDeadlines: boolean;
  profilePicture?: string;
  profilePictureUrl?: string;
  auth0Id: string;
}

export interface SimpleUser
  extends Pick<User, "id" | "email" | "profilePictureUrl"> {
  fullName: string;
}

export interface EditUser {
  email?: User["email"];
  firstName?: User["firstName"];
  lastName?: User["lastName"];
  phoneNumber?: User["phoneNumber"];
  alertsForTasks?: User["alertsForTasks"];
  alertsForDeadlines?: User["alertsForDeadlines"];
}
