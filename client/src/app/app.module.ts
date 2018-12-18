import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { AuthorEditComponent } from './components/author-edit/author-edit.component';
import { AuthorComponent } from './components/author/author.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookComponent } from './components/book/book.component';
import { ListAddComponent } from './components/list-add/list-add.component';
import { ListsListComponent } from './components/lists-list/lists-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CounterComponent } from './components/shared/counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    EditUserComponent,
    AuthorsListComponent,
    BooksListComponent,
    AuthorAddComponent,
    AuthorEditComponent,
    AuthorComponent,
    BookAddComponent,
    BookEditComponent,
    BookComponent,
    ListAddComponent,
    ListsListComponent,
    ShoppingCartComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
