import { Time } from "@angular/common";

export class catchLesson {
  id!: number;
  date!: Date;
  fromHour!: Time;
  tillHour!: Time;
  teacherId!: number;
  studentId!: number;
  lessonId!: number;
}
