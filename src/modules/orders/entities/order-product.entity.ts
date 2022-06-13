import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Min } from "class-validator";
import { ProductEntity } from "../../products/entities/product.entity";
import { OrderEntity } from "./order.entity";
import { BaseEntity } from "../../../shared/entities/BaseEntity";

@Entity({ name: 'order_product' })
export class OrderProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column({ type: 'integer' })
  @Min(1)
  count!: number
  
  @Column({ type: 'float' })
  amount!: number;
  
  @Column({ type: 'integer' })
  orderId!: number;

  @Column({ type: 'integer' })
  productId!: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({ name: 'orderId' })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.order)
  @JoinColumn({ name: 'productId' })
  product!: ProductEntity

}