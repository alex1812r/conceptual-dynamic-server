import { BaseEntity as TypeBaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity extends TypeBaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}