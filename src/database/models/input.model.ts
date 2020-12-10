import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/database/models/product.model';

@Entity('input')
export class Input {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({
    name: 'total_price',
    type: 'decimal',
    default: '0.00',
    precision: 11,
    scale: 2,
  })
  totalPrice!: string;

  @Column({ name: 'used_percentage', type: 'int' })
  usedPercentage!: string;

  @ManyToOne(() => Product, (product) => product.inputs)
  @JoinColumn({ name: 'id' })
  product?: Product;
}
