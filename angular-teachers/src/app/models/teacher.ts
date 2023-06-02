import { Specialty } from "./specialty";

export class Teacher {
  id: number | undefined;
  experience!: number;
  place: string | undefined;
  isActive: boolean = true;
  sameGender: boolean = false;
  userId: number | undefined;
}
