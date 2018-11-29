import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  signUp(userLogin, gethash = null) {
    if (gethash != null) {
      userLogin.gethash = gethash;
    }
    
    const json = JSON.stringify(userLogin);
    const params = json;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'login', params, {headers: headers}).pipe(map(res => res.json()));
  }
}



