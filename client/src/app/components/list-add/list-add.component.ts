
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BookListService } from '../../services/booklist.service';
import { BookList } from './../../models/book-list.model';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {
  public idUser;
  public hash;
  public apiURL;
  public bookList: BookList;
  public fullDate;
  public bookListObject;
  public errorMessage;
  public okMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _bookListService: BookListService
  ) {
    this.idUser = this._userService.getIdUser();
    this.hash = this._userService.getHash();
    this.apiURL = GLOBAL.url;
    this.fullDate = new Date();
    this.bookList = new BookList('', '', this.fullDate.toString(), '');
 }

ngOnInit() {
}

onSubmit() {
  this._bookListService.saveBookList(this.hash, this.bookList).subscribe(
    res => {
      if (!res) {
        this.errorMessage = 'Error en el servidor';
      } else {
        this.okMessage = 'Lista de libros creada correctamente';
        this.bookListObject = res;
        this.bookList = this.bookListObject.bookList;
        // this._router.navigate(['/author-edit/'], this.authorObject._id);
      }

  }, err => {
    console.log(err);
    this.errorMessage = err;
  });
}

}
