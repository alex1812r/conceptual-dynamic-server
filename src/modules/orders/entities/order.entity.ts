import { 
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany, 
} from "typeorm";
import { ClientEntity } from "../../clients/entities/client-entity";
import { BaseEntity } from "../../../shared/entities/BaseEntity";
import { OrderProductEntity } from "./order-product.entity";

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column({ default: 'pending' })
  status!: string;

  @Column({ type: 'integer' })
  clientId!: number;

  @Column({ type: 'float' })
  total!: number;

  @ManyToOne(() => ClientEntity, (client) => client.orders)
  @JoinColumn({ name: 'clientId' })
  client!: ClientEntity 

  @OneToMany(() => OrderProductEntity, (product) => product.order)
  orderProducts!: OrderProductEntity[]

}