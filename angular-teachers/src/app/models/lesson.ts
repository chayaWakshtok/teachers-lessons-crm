import { Series } from "./series";
import { Specialty } from "./specialty";
import { Subject } from "./subject";

export class Lesson {
  id!: number;
  durationHour: number = 1;
  title!: string;
  level: number | undefined;
  teacherId!: number;
  specialtyId!: number;
  specialty!: Specialty;
  subjectId!: number;
  subject!: Subject;
  seriesId: number | undefined | null;
  series: Series | undefined;
  createdAt!: Date;
  updatedAt!: Date;
}
