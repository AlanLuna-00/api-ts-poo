import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

@Entity({ name: "customer" })
export class CustomerEntity extends BaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false })
  adress!: string;
  @Column({ nullable: false })
  dni!: number;

  // Relation
  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({
    name: "user_id",
  })
  user!: UserEntity;
  // Relation purchase
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchase!: PurchaseEntity[];
}
