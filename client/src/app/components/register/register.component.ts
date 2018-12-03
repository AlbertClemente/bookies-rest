import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public user: User;
  public userObject;
  public userRegister;
  public errorMessage;
  public okMessage;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
  }

  public onSubmitRegister() {
    console.log(this.user);
    this._userService.signUp(this.user).subscribe(
      res => {
        this.userObject = res;
        this.userRegister = this.userObject.user;

        if (!this.userRegister._id) {
          alert('El usuario no se ha registrado correctamente.');
        } else {
          this.okMessage = 'Registro hecho satisfactoriamente.';
          this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }
}
