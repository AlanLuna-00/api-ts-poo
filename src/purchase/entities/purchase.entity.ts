import { BaseEntity } from "../../config/base.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { PurchaseProductEntity } from "./purchases_products.entity";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
  @Column({ nullable: false })
  status!: string;
  @Column({ nullable: false })
  paymentMethod!: string;

  // Relation
  @ManyToOne(() => CustomerEntity, (customer) => customer.purchase)
  @JoinColumn({
    name: "customer_id",
  })
  customer!: CustomerEntity;
  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProducts) => purchaseProducts.purchase
  )
  purchaseProduct!: PurchaseProductEntity[];
}
