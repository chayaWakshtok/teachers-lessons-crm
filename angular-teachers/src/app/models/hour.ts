import { Time } from "@angular/common";

export class Hour {
  id!: number;
  day!: number;
  fromHour!: Time;
  tillHour!: Time;
  isActive: boolean = true;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  teacherId!: number;
}