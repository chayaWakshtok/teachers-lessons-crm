import { Time } from "@angular/common";

export class Hour {
  id!: number;
  day!: number;
  fromHour!: string;
  tillHour!: string;
  isActive: boolean = true;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  teacherId!: number;
}
