import { Specialty } from "./specialty";
import { User } from "./user";

export class Teacher {
  id: number | undefined;
  experience!: number;
  place: string | undefined;
  isActive: boolean = true;
  sameGender: boolean = false;
  userId: number | undefined;
  user:User | undefined;
}
