import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { Exclude } from "class-transformer";
import { RoleType } from "../dto/user.dto";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false })
  name!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  lastName!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  email!: string;
  @Column({ type: "varchar", length: 50, nullable: true })
  jobPosition?: string;
  @Exclude()
  @Column({ select: false })
  password!: string;
  @Column({ type: "int", nullable: true })
  numberPhone?: number;
  @Column({ type: "enum", enum: RoleType, default: "USER" })
  role!: RoleType;
  @OneToOne(() => CustomerEntity, (user) => user.user)
  customer!: CustomerEntity;
}
