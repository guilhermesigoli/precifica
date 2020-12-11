import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Order } from 'src/database/models/order.model';
import { Product } from 'src/database/models/product.model';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email!: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password!: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
