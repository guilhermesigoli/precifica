import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Input } from 'src/database/models/input.model';
import { Order } from 'src/database/models/order.model';
import { User } from 'src/database/models/user.model';

@Entity('product')
export class Product {
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

  @Column({
    name: 'inputs_price',
    type: 'decimal',
    default: '0.00',
    precision: 11,
    scale: 2,
  })
  inputsPrice!: string;

  @Column({ name: 'profit_percentage', type: 'int' })
  profitPercentage!: string;

  @Column({ name: 'is_avaible', type: 'boolean' })
  isAvaible!: boolean;

  @OneToMany(() => Input, (input) => input.product)
  inputs?: Input[];

  @ManyToMany(() => Order, (order) => order.products, { cascade: true })
  orders?: Order[];

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
