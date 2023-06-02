import { Specialty } from "./specialty";

export class Subject {
  id!: number;
  name!: string;
  specialties: Specialty[] = [];

}
