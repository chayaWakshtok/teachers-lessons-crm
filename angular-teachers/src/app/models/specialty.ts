import { Series } from "./series";

export class Specialty {

  id: number | undefined;
  name!: string;
  subjectId!: number;
  series: Series[] = []
}
