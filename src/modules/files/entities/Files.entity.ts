import { Column,  Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../../shared/entities/BaseEntity";
import { ProductEntity } from "../../products/entities/product.entity";

@Entity({ name: 'file' })
export class FileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;
  
  @Column({ unique: true, nullable: false })
  fileId!: string;
  
  @Column({ nullable: false })
  filename!: string;
  
  @Column({ unique: true, nullable: false })
  url!: string;

  @OneToOne(() => ProductEntity, (product) => product.image) // specify inverse side as a second parameter
  product?: ProductEntity
}