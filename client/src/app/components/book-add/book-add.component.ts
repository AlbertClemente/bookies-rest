import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { AuthorService } from './../../services/author.service';

import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public authors: Author;
  public authorsObject;
  public book: Book;
  public bookObject;
  public errorMessage;
  public okMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _authorService: AuthorService,
    private _bookService: BookService
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
    this.book = new Book('', '', parseInt('', 10), '', '', parseInt('', 10), '', parseFloat(''), parseFloat(''), parseFloat(''), '') ;
    this.getFullAuthorsList();
  }

  ngOnInit() {

  }
  getFullAuthorsList() {
    this._authorService.getAuthorsFull(this.hash).subscribe(
      res => {
        if (!res) {
          this.errorMessage = 'No se han podido obtener los autores correctamente.';
        } else {
          this.authorsObject = res;
          this.authors = this.authorsObject.authors;
          console.log(this.authors);
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }

  onSubmit() {

    this._bookService.addBook(this.hash, this.book).subscribe(
      res => {
        if (!res) {
          this.errorMessage = 'Error en el servidor';
        } else {
          this.okMessage = 'Libro creado correctamente.';
          this.bookObject = res;
          this.book = this.bookObject.book;

          setTimeout(() => {
            this._router.navigate(['/book-edit/'], this.book._id);
          }, 3000);
        }

    }, err => {
      console.log(err);
      this.errorMessage = err;
    });
  }

  priceMember(bookPrice: number) {
    this.book.priceMember = parseFloat((bookPrice - (bookPrice * 0.2)).toFixed(2));
    return this.book.priceMember;
  }
}

