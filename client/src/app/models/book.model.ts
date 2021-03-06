export class Book {
  constructor(
    public title: string,
    public description: string,
    public year: number,
    public image: string,
    public publisher: string,
    public numPages: number,
    public genre: string,
    public price: number,
    public author: string
  ) {}
}
