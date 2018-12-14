import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

import { Product } from '../../entities/product.entity';
import { Item } from '../../entities/item.entity';

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
  private items: Item[] = [];
  private totalPrice = 0;
  constructor(
    private _route: ActivatedRoute,
    private _shoppingCart: ShoppingCartService,
    private _bookService: BookService,
    private _userService: UserService
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
  }

  ngOnInit() {

  }

}
