import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Author } from '../../models/author.model';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

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
  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) { 
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
    this.author = new Author('', '', '', '');
   }

  ngOnInit() {
  }

}
