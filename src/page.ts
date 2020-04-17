
class Page {
  public title: string;
  public content: string;
  public author: string;
  public url: string;

  constructor (title: string, content: string, author: string, url: string) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.url = url;
  }

  public getData(): string {
    return JSON.stringify({
      title: this.title,
      content: this.content,
      author: this.author,
      url: this.url
    });
  }
}

export default Page;