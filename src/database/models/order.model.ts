import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/database/models/product.model';
import { User } from 'src/database/models/user.model';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @CreateDateColumn({ name: 'created_at', precision: 3 })
  createdAt!: Date;

  @Column({
    name: 'total_price',
    type: 'decimal',
    default: '0.00',
    precision: 11,
    scale: 2,
  })
  totalPrice!: string;

  @Column({
    name: 'inputs_price',
    type: 'decimal',
    default: '0.00',
    precision: 11,
    scale: 2,
  })
  inputsPrice!: string;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'order_product_order',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products?: Product[];

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
