import { Time } from "@angular/common";

export class Holiday {
  id!: number;
  title!: string;
  date!: Date;
  toDate!: Date;
  fromHour: Time | undefined;
  tillHour: Time | undefined;
  allDay: boolean = false;
  isActive: boolean = true;
  teacherId!: number;
}
