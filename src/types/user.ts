export interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  alertsForTasks: boolean;
  alertsForDeadlines: boolean;
  profilePicture: string | null;
  profilePictureUrl: string | null;
}
