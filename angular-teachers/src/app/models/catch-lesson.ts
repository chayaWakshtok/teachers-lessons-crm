import { Time } from "@angular/common";
import { Lesson } from "./lesson";
import { Student } from "./student";
import { Teacher } from "./teacher";

export class catchLesson {
  id!: number;
  dateFrom!: Date;
  dateTo!: Date;
  teacherId!: number;
  studentId!: number;
  lessonId!: number;
  lesson: Lesson = new Lesson();
  student: Student = new Student();
  teacher:Teacher=new Teacher();
}
