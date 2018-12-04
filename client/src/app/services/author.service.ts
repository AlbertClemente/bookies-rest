import { Author } from './../models/author.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})

export class AuthorService {
  public hash;
  public apiURL;

  constructor(private _http: HttpClient) {
    this.apiURL = GLOBAL.url;
  }

  getAuthors(hash, page) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.get(this.apiURL + 'authors/' + page, {headers: headers});
  }

  getAuthor(hash, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.get(this.apiURL + 'author/' + id, {headers: headers});
  }

  addAuthor(hash, author: Author) {
    const json = JSON.stringify(author);
    const params = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });

    return this._http.post(this.apiURL + 'author', params, {headers: headers});
  }

  updateAuthor(hash, id: string, author: Author) {
    const json = JSON.stringify(author);
    const params = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });

    return this._http.put(this.apiURL + 'update-author/' + id, params, {headers: headers});
  }

  deleteAuthor(hash, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.delete(this.apiURL + 'author/' + id, {headers: headers});
  }
}




