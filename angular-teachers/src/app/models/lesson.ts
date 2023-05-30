export class Lesson {
  id!: number;
  durationHour: number = 1;
  title!: string;
  level: number | undefined;
  teacherId!: number;
  specialtyId!: number;
  seriesId: number | undefined;
}
