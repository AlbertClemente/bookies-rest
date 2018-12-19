import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cart: Cart = new Cart();
  itemsCart;
  constructor() {
    console.log('Shopping cart funcionando');
  }

  toCart(order: Order) {
    /*
    Antes de añadir al carrito, comprobamos si está el libro.
    En caso de que esté, al libro encontrado le añadimos la cantidad original para actualizarlo.
    En caso que no esté, añadimos al carrito directamente.
    */

    let orderFound = this.cart.orders.find(ord => ord.book._id === order.book._id);

    if (orderFound !== undefined) {
      orderFound.quantity += order.quantity;
    } else {
      this.cart.orders.push(order);
    }
  }

  getCart() {
    return this.cart.orders;
  }

}
