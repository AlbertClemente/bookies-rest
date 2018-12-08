import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AuthorService } from '../../services/author.service';
import { BookService } from 'src/app/services/book.service';


import { Author } from '../../models/author.model';
import { Book } from './../../models/book.model';



@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  public idUser;
  public hash;
  public apiURL: string;
  public author: Author;
  public books: Book;
  public authorObject;
  public booksObject;
  public updateAuthor;
  public tokenObject;
  public filesToUpload: Array<File>;
  public errorMessage;
  public okMessage;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService,
      private _authorService: AuthorService,
      private _bookService: BookService
    ) {
      this.idUser = this._userService.getIdUser();
      this.hash = this._userService.getHash();
      this.apiURL = GLOBAL.url;
      this.author = new Author('', '', '', '');
   }

  ngOnInit() {
    this.getAuthor();
    this.getBooks();
  }

  getAuthor() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._authorService.getAuthor(this.hash, id).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'El usuario no se ha obtenido correctamente.';
          } else {
            this.authorObject = res;
            this.author = this.authorObject.author;
            console.log(this.author);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
      });
    });
  }

  getBooks() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._bookService.getBooksByAuthor(this.hash, id).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'Los libros no se han obtenido correctamente.';
          } else {
            this.booksObject = res;
            this.books = this.booksObject.books;
            console.log(this.books);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
      });
    });
  }

}
