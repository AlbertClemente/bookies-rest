import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public user: User;
  public idUser;
  public hash;
  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
  }

  public logout() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('hash');
    this.idUser = null;
    this.hash = null;
  }
}
