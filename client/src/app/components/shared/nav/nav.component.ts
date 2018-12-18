import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CounterComponent } from '../counter/counter.component';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
  }

  ngOnInit() {

  }

  public logout() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('hash');
    this.idUser = null;
    this.hash = null;
    this._router.navigate(['/']);
  }
}
