import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import { AuthorComponent } from './components/author/author.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookComponent } from './components/book/book.component';
import { ListAddComponent } from './components/list-add/list-add.component';
import { ListsListComponent } from './components/lists-list/lists-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'authors', component: AuthorsListComponent },
  { path: 'authors/:page', component: AuthorsListComponent },
  { path: 'author-add', component: AuthorAddComponent },
  { path: 'author-edit/:id', component: AuthorEditComponent },
  { path: 'author/:id', component: AuthorComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'books/:page', component: BooksListComponent },
  { path: 'book-add', component: BookAddComponent },
  { path: 'book-edit/:id', component: BookEditComponent },
  { path: 'list-add', component: ListAddComponent },
  { path: 'booklists/:page', component: ListsListComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
