import { Book } from './book.model';

export class Order {
  public book: Book;
  public quantity: number;
  constructor(book: Book, quantity: number) {
    this.book = book;
    this.quantity = quantity;
  }
}
