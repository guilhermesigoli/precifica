import { Product } from 'src/database/models/product.model';
import { Order } from 'src/database/models/order.model';
import { Input } from 'src/database/models/input.model';
import { User } from 'src/database/models/user.model';

export const entities = [User, Input, Order, Product];
