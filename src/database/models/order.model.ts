import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/database/models/product.model';
import { User } from 'src/database/models/user.model';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id', type: 'bigint' })
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

  @Column({ name: 'is_avaible', type: 'boolean' })
  isAvaible!: boolean;

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({
    name: 'order_product_order',
    joinColumn: { name: 'order_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  products?: Product[];

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
