import { Specialty } from "./specialty";

export class Series {
  id!: number;
  name!: string;
  description!: string;
  level!: number;
  price!: number;
  specialtyId!: number;
  specialty: Specialty | undefined;
  teacherId!: number;
}
