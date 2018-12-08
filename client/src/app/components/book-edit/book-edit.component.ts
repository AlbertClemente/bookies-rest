import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { AuthorService } from './../../services/author.service';

import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL: string;
  public book: Book;
  public bookObject;
  public authors: Author;
  public authorsObject;
  public updateBook;
  public tokenObject;
  public filesToUpload: Array<File>;
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
    this.book = new Book('', '', parseInt(''), '', '', parseInt(''), '', parseFloat(''), parseFloat(''), parseFloat(''), '') ;
  }

  ngOnInit() {
    this.getBook();
    this.getFullAuthorsList();
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

  getBook() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._bookService.getBook(this.hash, id).subscribe(
        res => {
          if (!res) {
            this.errorMessage = 'El libro no se ha obtenido correctamente.';
          } else {
            this.bookObject = res;
            this.book = this.bookObject.book;
            console.log(this.book);
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
      });
    });
  }

  onSubmitEdit() {
    console.log(this.book);
    this._route.params.forEach((params: Params) => {
      const id = params['id'];

      this._bookService.updateBook(this.hash, id, this.book).subscribe(
        res => {
          this.bookObject = res;
          this.updateBook = this.bookObject.book;

          if (!this.updateBook) {
            this.errorMessage = 'El libro no se ha actualizado correctamente.';
          } else {
            if (!this.filesToUpload) {
              this.errorMessage = 'Error al subir el archivo.';
            } else {
              this.makeFileRequest(this.apiURL + 'upload-image-book/' + id, [], this.filesToUpload, this.hash, 'image')
              .then(
                (result: any) => {
                  this.book.image = result.image;
                }
              )
              .catch(err => {
                this.errorMessage = err;
                console.log(err);
              });
            }
            this.okMessage = 'Tus datos han sido actualizados correctamente.';
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
        }
      );
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let index = 0; index < files.length; index++) {
        formData.append(name, files[index], files[index].name);
      }

      // Petición Ajax para subir los archivos
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }
}
