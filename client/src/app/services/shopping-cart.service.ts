import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: Cart = new Cart();
  public cartValue = 0;

  constructor() {
    console.log('Shopping cart funcionando');
  }

  toCart(order: Order) {
    this.cart.orders.push(order);
  }

  getCart() {
    console.log(this.cart.orders);
    return this.cart.orders;
  }

}
