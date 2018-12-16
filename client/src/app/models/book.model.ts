export class Book {
  public title: string;
  public description: string;
  public year: number;
  public image: string;
  public publisher: string;
  public numPages: number;
  public genre: string;
  public price: number;
  public priceMember: number;
  public review: number;
  public stock: number;
  public author: string;
  constructor(
    public titleBook: string,
    public descriptionBook: string,
    public yearBook: number,
    public imageBook: string,
    public publisherBook: string,
    public numPagesBook: number,
    public genreBook: string,
    public priceBook: number,
    public priceMemberBook: number,
    public reviewBook: number,
    public stockBook: number,
    public authorBook: string
  ) {
    this.title = titleBook;
    this.description = descriptionBook;
    this.year = yearBook;
    this.image = imageBook;
    this.publisher = publisherBook;
    this.numPages = numPagesBook;
    this.genre = genreBook;
    this.price = priceBook;
    this.priceMember = priceMemberBook;
    this.review = reviewBook;
    this.stock = stockBook;
    this.author = authorBook;
  }
}
