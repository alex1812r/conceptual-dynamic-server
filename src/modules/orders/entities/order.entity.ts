import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "../../clients/entities/client-entity";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @ManyToOne(() => ClientEntity, (client) => client.orders)
  client!: ClientEntity

  @ManyToMany(() => ProductEntity, (product) => product.orders)
  products!: ProductEntity[]
}