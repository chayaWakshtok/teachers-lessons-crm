import { Time } from "@angular/common";
import { Lesson } from "./lesson";
import { Student } from "./student";
import { Teacher } from "./teacher";
import { Remark } from "./remark";

export class catchLesson {
  id!: number;
  dateFrom: Date=null!;
  dateTo!: Date;
  teacherId!: number;
  studentId!: number;
  lessonId!: number;
  lesson: Lesson = new Lesson();
  student: Student = new Student();
  teacher: Teacher = new Teacher();
  remarks: Remark[] = [];
}
