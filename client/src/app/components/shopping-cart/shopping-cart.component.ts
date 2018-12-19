import { Order } from './../../models/order.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public orders: Order [] = [];
  public subtotals: number [] = [];
  public totalPrice = 0;
  public totalPriceIVA = 0;
  constructor(
    private _route: ActivatedRoute,
    private _shoppingCartService: ShoppingCartService,
    private _userService: UserService
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
    this.getSubTotals();
    this.getTotal(this.subtotals);
  }

  ngOnInit() {

  }

  getSubTotals() {
    this.orders = this._shoppingCartService.getCart();
    this.orders.forEach(
      elem => {
        this.subtotals.push(parseFloat((elem.book.priceMember * elem.quantity).toFixed(2)));
        return this.subtotals;
      }
    );
  }

  getTotal (subtotals) {
    for (let index = 0; index < subtotals.length; index++) {
      this.totalPrice += subtotals[index];
    }
    // IVA
    this.totalPriceIVA = this.totalPrice + (this.totalPrice * 0.21);
  }
}
