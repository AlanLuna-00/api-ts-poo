import { BaseEntity } from "../../config/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
  @Column({ nullable: false })
  categoryName!: string;

  // Relation
  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}
