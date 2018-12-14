import { Author } from './../../models/author.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthorService } from '../../services/author.service';

import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css']
})
export class AuthorsListComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public authors: Author[];
  public authorObject;
  public page;
  public next_page;
  public prev_page;
  public errorMessage;
  public okMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _authorService: AuthorService) {
      this.idUser = this._userService.getIdUser();
      this.hash = this._userService.getHash();
      this.apiURL = GLOBAL.url;
      this.next_page = 1;
      this.prev_page = 1;
  }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
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
      this._authorService.getAuthors(this.hash, page).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'No se han podido obtener los autores correctamente.';
          } else {
            this.authorObject = res;
            this.authors = this.authorObject.authors;
            console.log(this.authors);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
        }
      );
    });
  }

  deleteAuthor(authorId) {
    console.log(authorId);
    this._authorService.deleteAuthor(this.hash, authorId).subscribe(
      res => {
        if (!res) {
          this.errorMessage = 'No se ha podido completar la operación. Error en el servidor.';
        } else {
          this.okMessage = 'Se ha borrado al autor satisfactoriamente.';
          this._router.navigate(['/authors']);
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }
}
