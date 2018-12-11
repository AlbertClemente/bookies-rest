import { BookList } from './../../models/book-list.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookListService } from '../../services/booklist.service';

import { GLOBAL } from '../../services/global';


@Component({
  selector: 'app-lists-list',
  templateUrl: './lists-list.component.html',
  styleUrls: ['./lists-list.component.css']
})
export class ListsListComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public booksLists: BookList;
  public booksListsObject;
  public page;
  public next_page;
  public prev_page;
  public errorMessage;
  public okMessage;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _bookListService: BookListService) {
      this.idUser = this._userService.getIdUser();
      this.hash = this._userService.getHash();
      this.apiURL = GLOBAL.url;
      this.next_page = 1;
      this.prev_page = 1;
  }

  ngOnInit() {
    this.getBookLists();
  }

  getBookLists() {
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
      this._bookListService.getLists(this.hash, page).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'No se han podido obtener las listas de libros correctamente.';
          } else {
            this.booksListsObject = res;
            this.booksLists = this.booksListsObject.bookLists;
            console.log(this.booksLists);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
        }
      );
    });
  }
  /*
  deleteBook(bookId) {
    this._bookListService.deleteBookList(this.hash, bookId).subscribe(
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
  */
}
