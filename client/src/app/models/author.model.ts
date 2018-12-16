export class Author {
  public name: string;
  public surname: string;
  public description: string;
  public image: string;
  constructor(
    public nameAuthor: string,
    public surnameAuthor: string,
    public descriptionAuthor: string,
    public imageAuthor: string
  ) {
    this.name = nameAuthor;
    this.surname =  surnameAuthor;
    this.description = descriptionAuthor;
    this.image = imageAuthor;
  }
}
