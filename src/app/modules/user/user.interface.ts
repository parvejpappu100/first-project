export type TUser = {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role:  "student" |  "faculty" | "admin";
  isDeleted: boolean;
  status: "in-progress" | "blocked";
};
