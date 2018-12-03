import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: User;
  public idUser;
  public hash;
  
  constructor(private _userService: UserService) {}
  ngOnInit() {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
  }

}
