import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  apiURL = 'http://localhost:3977/api/';
  public idUser;
  public hash;

  constructor(private _http: HttpClient) {}

  signUp(userLogin, gethash = null) {
    if (gethash != null) {
      userLogin.gethash = gethash;
    }

    const json = JSON.stringify(userLogin);
    const params = json;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.apiURL + 'login/', params, {headers: headers});
  }

  public getIdUser() {
    let idUser = JSON.parse(localStorage.getItem('idUser'));
    if (idUser !== undefined) {
      this.idUser = idUser;
    } else {
      this.idUser = null;
    }
    return this.idUser;
  }

  public getHash() {
    let hash = JSON.parse(localStorage.getItem('hash'));
    if(hash !== undefined) {
      this.hash = hash;
    } else {
      this.hash = null;
    }
    return this.hash;
  }
}




