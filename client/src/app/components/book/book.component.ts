
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';

import { GLOBAL } from '../../services/global';

import { Book } from './../../models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL: string;
  public book;
  public author;
  public bookObject;
  public tokenObject;
  public errorMessage;
  public okMessage;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _bookService: BookService
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
 }

  ngOnInit() {
    this.getBook();
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
            console.log(this.book);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
        }
      );
    });
  }
}
