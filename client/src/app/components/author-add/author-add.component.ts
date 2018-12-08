import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthorService } from '../../services/author.service';

import { Author } from '../../models/author.model';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public author: Author;
  public authorObject;
  public errorMessage;
  public okMessage;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private _authorService: AuthorService
    ) {
      this.idUser = this._userService.getIdUser();
      this.hash = this._userService.getHash();
      this.apiURL = GLOBAL.url;
      this.author = new Author('', '', '', '');
   }

  ngOnInit() {
  }

  onSubmit() {
    this._authorService.addAuthor(this.hash, this.author).subscribe(
      res => {
        if (!res) {
          this.errorMessage = 'Error en el servidor';
        } else {
          this.okMessage = 'Autor creado correctamente';
          this.authorObject = res;
          this.author = this.authorObject.author;
          // this._router.navigate(['/author-edit/'], this.authorObject._id);
        }

    }, err => {
      console.log(err);
      this.errorMessage = err;
    });
  }
}
