import { catchLesson } from "./catch-lesson";
import { Series } from "./series";
import { Specialty } from "./specialty";
import { Subject } from "./subject";
import { Teacher } from "./teacher";

export class Lesson {
  id!: number;
  durationHour: number = 1;
  title!: string;
  level: number | undefined;
  teacher: Teacher | undefined;
  teacherId!: number;
  specialtyId!: number;
  specialty!: Specialty;
  subjectId!: number;
  subject!: Subject;
  seriesId: number | undefined | null;
  series: Series | undefined;
  price!: number;
  createdAt!: Date;
  updatedAt!: Date;
  description!: string;
  catchLessons: catchLesson[] = [];
}
