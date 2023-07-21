import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;
  @IsNotEmpty()
  lastName!: string;
  @IsNotEmpty()
  email!: string;
  @IsNotEmpty()
  jobPosition?: string;
  @IsNotEmpty()
  password!: string;
  @IsNotEmpty()
  numberPhone?: number;
}

export enum RoleType {
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}
