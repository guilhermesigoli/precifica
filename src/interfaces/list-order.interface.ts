import { Order } from 'src/database/models/order.model';
export interface IListOrders {
  orders: Partial<Order[]>;
  total: number;
}
