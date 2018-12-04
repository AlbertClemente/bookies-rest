import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public userObject;
  public tokenObject;
  public idUser;
  public hash;
  public errorMessage;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
  }
  public onSubmit() {
    this._userService.signIn(this.user).subscribe(
      res => {
        this.userObject = res;
        this.idUser = this.userObject.user;

        if (!this.idUser) {
          alert('El usuario no se ha logueado correctamente.');
        } else {
          // Sesión Usuario a Localstorage
          localStorage.setItem('idUser', JSON.stringify(this.idUser));
          // Conseguir hash
          this._userService.signIn(this.user, true).subscribe(
            response => {
              this.tokenObject = response;
              this.hash = this.tokenObject.token;
              if (this.hash.length <= 0) {
                alert('El token no se ha generado correctamente.');
              } else {
                // Token Usuario Localstorage
                localStorage.setItem('hash', JSON.stringify(this.hash));
                this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
              }
            },
            err => {
              console.log(err);
              this.errorMessage = err;
            }
          );
        }
        this._router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }
}
