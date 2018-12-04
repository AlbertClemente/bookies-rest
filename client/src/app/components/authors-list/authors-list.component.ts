import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Author } from '../../models/author.model';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

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
  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) { 
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
   }

  ngOnInit() {
  }

}
