import { Book } from './../../models/book.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public books: Book;
  public booksObject;
  public page;
  public next_page;
  public prev_page;
  public errorMessage;
  public okMessage;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _bookService: BookService) {
      this.idUser = this._userService.getIdUser();
      this.hash = this._userService.getHash();
      this.apiURL = GLOBAL.url;
      this.next_page = 1;
      this.prev_page = 1;
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this._route.params.forEach((params: Params) => {
      // Paginación
      const page = + params['page'];
      if (!page) {
        this.page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page === 0) {
          this.prev_page = 1;
        }
      }
      this._bookService.getBooks(this.hash, page).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'No se han podido obtener los libros correctamente.';
          } else {
            this.booksObject = res;
            this.books = this.booksObject.books;
            console.log(this.books);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
        }
      );
    });
  }

  deleteBook(bookId) {
    this._bookService.deleteBook(this.hash, bookId).subscribe(
      res => {
        if (!res) {
          this.errorMessage = 'No se ha podido completar la operación. Error en el servidor.';
        } else {
          this.okMessage = 'Se ha borrado al libro satisfactoriamente.';
          this._router.navigate(['/books']);
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }
}
