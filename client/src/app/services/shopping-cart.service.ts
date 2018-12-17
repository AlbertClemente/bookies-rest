import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: Cart = new Cart();
  cartAux: Cart;

  constructor() {
    console.log('Shopping cart funcionando');
  }

  toCart(order: Order) {
    this.cart.orders.push(order);
    this.cartAux = this.cart;
    console.log(this.cart);
    console.log(this.cartAux);
  }
}
