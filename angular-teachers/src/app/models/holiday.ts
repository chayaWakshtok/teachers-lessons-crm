import { Time } from "@angular/common";

export class Holiday {
  id!: number;
  date!: Date;
  fromHour: Time | undefined;
  tillHour: Time | undefined;
  allDay: boolean = true;
  isActive: boolean = true;
  teacherId!: number;
}