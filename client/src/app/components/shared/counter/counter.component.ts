import { Component } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-counter',
  templateUrl: 'counter.component.html'
})
export class CounterComponent {
  public orders;
  public basketItems;
  constructor(private _shoppingCartService: ShoppingCartService) {
    this.getItems();
  }

  getItems() {
    this.orders = this._shoppingCartService.getCart();
    for (const order of this.orders) {
      this.basketItems += order.quantity;
    }
    if (this.basketItems === undefined) {
      this.basketItems = 0;
    }
    return this.basketItems;
  }

}
