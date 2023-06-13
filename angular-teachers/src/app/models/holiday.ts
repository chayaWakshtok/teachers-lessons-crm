import { Time } from "@angular/common";

export class Holiday {
  id!: number;
  title!: string;
  date!: Date;
  toDate!: Date;
  allDay: boolean = false;
  isActive: boolean = true;
  teacherId!: number;
}
