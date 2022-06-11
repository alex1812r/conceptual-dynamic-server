import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entities/BaseEntity";
import { OrderProductEntity } from "../../orders/entities/order-product.entity";
@Entity({ name: 'product' })
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column({ type: 'integer' })
  count!: number;
  
  @Column()
  name!: string
  
  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'float' })
  unitPrice!: number

  @Column({ default: 'available' })
  status!: string
  
  @Column({ nullable: true })
  imgUrl?: string

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  order!: OrderProductEntity

}