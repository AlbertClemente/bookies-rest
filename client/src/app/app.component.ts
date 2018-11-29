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
  public userObject;
  public tokenObject;
  public idUser;
  public hash;
  public errorMessage;

  constructor(private _userService: UserService) {
    this.user = new User('', '', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
  }

  public onSubmit() {
    this._userService.signUp(this.user).subscribe(
      res => {
        this.userObject = res;
        this.idUser = this.userObject.user;

        if (!this.idUser) {
          alert('El usuario no se ha logueado correctamente.');
        } else {
          // Sesión Usuario a Localstorage
          localStorage.setItem('idUser', JSON.stringify(this.idUser));
          // Conseguir hash
          this._userService.signUp(this.user, true).subscribe(
            response => {
              this.tokenObject = response;
              this.hash = this.tokenObject.token;
              if (this.hash.length <= 0) {
                alert('El token no se ha generado correctamente.');
              } else {
                // Token Usuario Localstorage
                localStorage.setItem('hash', JSON.stringify(this.hash));
              }
            },
            err => {
              console.log(err);
              this.errorMessage = err;
            }
          );
        }
      },
      err => {
        console.log(err);
        this.errorMessage = err;
      }
    );
  }

  public logout() {
    localStorage.removeItem('idUser');
    localStorage.removeItem('hash');
    this.idUser = null;
    this.hash = null;
  }
}

