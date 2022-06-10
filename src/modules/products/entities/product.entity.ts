import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../../orders/entities/order.entity";

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

  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders!: OrderEntity[]
}