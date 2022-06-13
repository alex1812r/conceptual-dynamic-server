import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Min } from "class-validator";
import { BaseEntity } from "../../../shared/entities/BaseEntity";
import { OrderProductEntity } from "../../orders/entities/order-product.entity";
@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column({ type: 'integer' })
  @Min(0)
  count!: number;
  
  @Column()
  name!: string
  
  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'float' })
  @Min(0)
  unitPrice!: number

  @Column({ default: 'available' })
  status!: string
  
  @Column({ nullable: true })
  imgUrl?: string

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  order!: OrderProductEntity

}