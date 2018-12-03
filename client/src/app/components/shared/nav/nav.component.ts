import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  providers: [UserService]
})
export class NavComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  constructor(private _userService: UserService) {
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
  }
}
