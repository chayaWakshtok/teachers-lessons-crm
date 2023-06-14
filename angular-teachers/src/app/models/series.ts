import { Specialty } from "./specialty";

export class Series {
  id!: number;
  name!: string;
  fromAge!: number;
  toAge!: number;
  specialtyId!: number;
  specialty: Specialty | undefined;
  teacherId!: number;
}