import { Book } from './../models/book.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public hash;
  public apiURL;

  constructor(private _http: HttpClient) {
    this.apiURL = GLOBAL.url;
  }

  getBook(hash, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.get(this.apiURL + 'book/' + id, {headers: headers});
  }

  getBooks(hash, page) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.get(this.apiURL + 'books/' + page, {headers: headers});
  }

  getBooksByAuthor(hash, id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.get(this.apiURL + 'books/author/' + id, {headers: headers});
  }

  addBook(hash, book: Book) {
    const json = JSON.stringify(book);
    const params = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });

    return this._http.post(this.apiURL + 'book', params, {headers: headers});
  }

  updateBook(hash, id: string, book: Book) {
    const json = JSON.stringify(book);
    const params = json;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });

    return this._http.put(this.apiURL + 'update-book/' + id, params, {headers: headers});
  }

  deleteBook(hash, id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': hash
    });
    return this._http.delete(this.apiURL + 'delete-book/' + id, {headers: headers});
  }
}
