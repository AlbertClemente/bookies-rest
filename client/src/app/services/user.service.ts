import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { GLOBAL } from './global';
@Injectable({
  providedIn: 'root',
})

export class UserService {
  public idUser;
  public hash;
  public apiURL;

  constructor(private _http: HttpClient) {
    this.apiURL = GLOBAL.url;
  }

  signIn(userLogin, gethash = null) {
    if (gethash != null) {
      userLogin.gethash = gethash;
    }

    const json = JSON.stringify(userLogin);
    const params = json;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.apiURL + 'login/', params, {headers: headers});
  }

  signUp(userSignUp) {
    const json = JSON.stringify(userSignUp);
    const params = json;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.apiURL + 'register/', params, {headers: headers});
  }

  updateUser(userUpdate) {
    const json = JSON.stringify(userUpdate);
    const params = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getHash()
    });

    return this._http.put(this.apiURL + 'update-user/' + userUpdate._id, params, {headers: headers});
  }

  public getIdUser() {
    const idUser = JSON.parse(localStorage.getItem('idUser'));
    if (idUser !== undefined) {
      this.idUser = idUser;
    } else {
      this.idUser = null;
    }
    return this.idUser;
  }

  public getHash() {
    const hash = JSON.parse(localStorage.getItem('hash'));
    if (hash !== undefined) {
      this.hash = hash;
    } else {
      this.hash = null;
    }
    return this.hash;
  }
}




