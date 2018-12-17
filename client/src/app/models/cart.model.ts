import { Order } from './order.model';

export class Cart {
  public orders: Order [];

  constructor() {
    this.orders = new Array();
  }
}
