import { Student } from "./student";

export class Remark {
  id!: number;
  title!: string;
  isRead: boolean = false;
  catchLessonId!: number;
  studentId!: number;
  student: Student | undefined;
  stars!: number;
}
