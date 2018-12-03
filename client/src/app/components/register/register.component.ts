import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userSignUp: User;
  public userObject;
  public tokenObject;
  public idUser;
  public hash;
  public errorMessage;
  public okMessage;


  constructor(private _userService: UserService) {
    this.userSignUp = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
  }

  onSubmitRegister() {
    console.log(this.userSignUp);
    this._userService.signUp(this.userSignUp).subscribe(
      res => {
        this.userObject = res;
        this.idUser = this.userObject.user;

        if (!this.idUser._id) {
          this.errorMessage = 'El usuario no se ha registrado correctamente.';
        } else {
          this.okMessage = 'Registro correcto.';
          this.userSignUp = new User('', '', '', '', '', '', 'ROLE_USER', '');
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      });
  }
}
