import { Specialty } from "./specialty";

export class Subject {
  id!: number;
  name!: string;
  lessonsCount!: number;
  specialties: Specialty[] = [];

}
