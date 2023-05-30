import { Time } from "@angular/common";

export class catchLesson {
  id!: number;
  day!: number;
  fromHour!: Time;
  tillHour!: Time;
  teacherId!: number;
  studentId!: number;
  lessonId!: number;
}