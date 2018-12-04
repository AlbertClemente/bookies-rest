import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthorService } from '../../services/author.service';

import { Author } from '../../models/author.model';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL: string;
  public author: Author;
  public authorObject;
  public updateAuthor;
  public tokenObject;
  public filesToUpload: Array<File>;
  public errorMessage;
  public okMessage;

  constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService,
      private _authorService: AuthorService
    ) {
      this.idUser = this._userService.getIdUser();
      this.hash = this._userService.getHash();
      this.apiURL = GLOBAL.url;
      this.author = new Author('', '', '', '');
   }

  ngOnInit() {
    this.getAuthor();
  }

  getAuthor() {
    this._route.params.forEach((params: Params) => {
      const id = params['id'];
      this._authorService.getAuthor(this.hash, id).subscribe(
        res => {
          if (!res) {
            alert('El usuario no se ha obtenido correctamente.');
            this._router.navigate(['/']);
          } else {
            this.authorObject = res;
            this.author = this.authorObject;
          }
        },
        err => {
          console.log(err);
          this.errorMessage = err;
      });
    });
  }

  onSubmitEdit() {
    console.log(this.author);
    this._route.params.forEach((params: Params) => {
      const id = params['id'];

      this._authorService.updateAuthor(this.hash, id, this.author).subscribe(
        res => {
          this.authorObject = res;
          this.updateAuthor = this.authorObject.author;
          if (!this.updateAuthor) {
            alert('El autor no se ha actualizado correctamente.');
          } else {
            if (!this.filesToUpload) {
              this.errorMessage = 'Error al subir el archivo.';
            } else {
              this.makeFileRequest(this.apiURL + 'upload-image-author/' + id, [], this.filesToUpload)
              .then(
                (result: any) => {
                  this.author.image = result.image;
                  console.log(this.author);
                }
              );
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

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    const token = this.hash;

    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let index = 0; index < files.length; index++) {
        formData.append('image', files[index], files[index].name);
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
