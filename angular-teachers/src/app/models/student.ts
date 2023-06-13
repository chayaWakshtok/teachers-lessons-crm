import { User } from "./user";

export class Student {
  id!: number;
  learnYear!: number;
  userId!: number;
  user: User = new User();
}
