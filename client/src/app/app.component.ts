import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'Bookies';
  public user: User;
  public identity;
  public token;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this._userService.signUp(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

  public onSubmit() {
    console.log(this.user);
  }
}
