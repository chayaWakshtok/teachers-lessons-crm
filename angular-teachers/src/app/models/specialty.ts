import { Series } from "./series";

export class Specialty {

  id!: number;
  name!: string;
  subjectId!: number;
  specialtiesCount!: number;
  series: Series[] = []
}
