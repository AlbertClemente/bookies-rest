import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';

import { BookList } from './../models/book-list.model';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  public hash;
  public apiURL;

  constructor(private _http: HttpClient) {
    this.apiURL = GLOBAL.url;
  }

  getLists(hash, page) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.get(this.apiURL + 'booklists/' + page, {headers: headers});
  }

  saveBookList(hash, bookList: BookList) {
    const json = JSON.stringify(bookList);
    const params = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });

    return this._http.post(this.apiURL + 'booklist', params, {headers: headers});
  }
}

