import { User } from "../../../types/user";

export const users: User[] = [
  {
    id: 2,
    username: "kaviesenkathir",
    email: "kaviss98@hotmail.com",
    phoneNumber: 97890782,
    firstName: "Kaviesen",
    lastName: "Kathir",
    alertsForTasks: true,
    alertsForDeadlines: true,
    profilePicture: null,
    profilePictureUrl: null
  },
  {
    id: 1,
    username: "francinvincent",
    email: "francin.vinc@gmail.com",
    phoneNumber: 46629490,
    firstName: "Francin",
    lastName: "Vincent",
    alertsForTasks: true,
    alertsForDeadlines: true,
    profilePicture: "profilePictures/IMG_0849.jpeg",
    profilePictureUrl:
      "https://schmell-files.s3.eu-north-1.amazonaws.com/profilePictures/IMG_0849.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221102T001741Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=AKIAYQSVEZSA46SJCF7N%2F20221102%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=64bbf133c02cd47a92a6a1518623cb7a25351db23547c4932fe2173c21867d9c"
  }
];
