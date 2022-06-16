import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Min } from "class-validator";
import { BaseEntity } from "../../../shared/entities/BaseEntity";
import { OrderProductEntity } from "../../orders/entities/order-product.entity";
import { FileEntity } from "../../files/entities/Files.entity";
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

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date | null

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  order!: OrderProductEntity

  @Column({ type: 'integer', nullable: true })
  imageId?: number;

  @OneToOne(() => FileEntity)
  @JoinColumn({ name: 'imageId' })
  image?: FileEntity;
}