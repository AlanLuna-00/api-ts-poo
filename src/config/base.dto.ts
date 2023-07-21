import { IsOptional, Validate, isDate, isUUID } from "class-validator";
import { UpdateDateColumn } from "typeorm";

export class BaseDTO {
  @IsOptional()
  @Validate(isUUID)
  id!: string;

  @IsOptional()
  @Validate(isDate)
  createdAt!: Date;

  @IsOptional()
  @Validate(isDate)
  updatedAt!: Date;
}
