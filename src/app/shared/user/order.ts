import { Product } from './../product/product';
import { User } from './user';

export class Order {
    user: User;
    product: Product;
    quantity: number;
    date: string;
    constructor() {

    }
}
