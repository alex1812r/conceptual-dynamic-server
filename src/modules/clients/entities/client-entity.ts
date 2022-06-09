import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, Length, Max, Min } from "class-validator";
import { OrderEntity } from "../../orders/entities/order.entity";

@Entity({ name: 'client' })
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column({ unique: true })
  dni!: string;
  
  @Column()
  @Length(4)
  name!: string;

  @Column()
  @Length(4)
  lastname!: string;

  @Column({ nullable: true })
  @Length(10, 15)
  phone?: string;

  @Column()
  @IsEmail()
  email!: string
  
  @Column({ type: 'date' })
  dateOfBirth!: Date;
  
  @Column({ default: 'active' })
  status!: string

  @OneToMany(() => OrderEntity, (order) => order.client)
  orders!: OrderEntity[]
}