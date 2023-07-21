import { BaseEntity } from "../../config/base.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { PurchaseProductEntity } from "../../purchase/entities/purchases_products.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity {
  @Column({ type: "varchar", length: 50, nullable: false })
  productName!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  description!: string;
  @Column({ nullable: false })
  price!: number;

  // Relation
  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category!: CategoryEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProducts) => purchaseProducts.product
  )
  purchaseProduct!: PurchaseProductEntity[];
}
