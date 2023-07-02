import { City } from "./city";
import { Role } from "./role";
import { Student } from "./student";
import { Teacher } from "./teacher";

export class User {
  id: number | undefined;
  username!: string;
  email!: string;
  password!: string;
  tz!: string;
  firstName!: string;
  lastName!: string;
  gender!: number;
  bornDate!: Date;
  phone!: string;
  telphone: string | undefined;
  cityId!: number;
  street: string | undefined;
  city: City | undefined;
  roleId!: number;
  role: Role | undefined;
  age!: number;
  accessToken: string | undefined;
  teacher: Teacher | undefined;
  student: Student | undefined;
  picture: string | undefined;
}
