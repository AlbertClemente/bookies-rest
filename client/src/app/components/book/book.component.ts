
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';


import { GLOBAL } from '../../services/global';

import { Book } from './../../models/book.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL: string;
  public book: Book;
  public author;
  public bookObject;
  public tokenObject;
  public errorMessage;
  public okMessage;
  public contentLoaded;
  public bookQuantity: number;
  public quantity: number;
  public bookOrder: Order;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _bookService: BookService,
    private _shoppingCartService: ShoppingCartService
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
    this.contentLoaded = false;
    this.quantity = 1;
    this.getBook();
 }

  ngOnInit() {

  }

  getBook() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._bookService.getBook(this.hash, id).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'No se ha podido obtener el libro.';
          } else {
            this.bookObject = res;
            this.book = this.bookObject.book;
            this.author = this.book.author;
            this.contentLoaded = true;
          }
        },
        err => {
          this.errorMessage = err;
          console.log(err);
        }
      );
    });
  }

  addUnits(quantity) {
    this.quantity = this.quantity + 1;
    return quantity;
  }

  removeUnits(quantity) {
    this.quantity = this.quantity - 1;
    if (this.quantity <= 0) {
      this.quantity = 0;
    }
    return quantity;
  }

  buyBook(book, quantity) {
    this.bookOrder = new Order(book, quantity);
    this._shoppingCartService.toCart(this.bookOrder);
  }

}
