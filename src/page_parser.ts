//const {Builder, By, Key, until} = require('selenium-webdriver');
const puppeteer = require('puppeteer');

import Page from "./page";

class Parser {
  private url: string;

  constructor (url: string) {
    this.url = url;
  }

  public async parsePage(): Promise<Page[]> {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(this.url);

      const urls: any[] = await page.$$eval('a', as => as.map(a => a.href));

      //console.log(news);
      const urlsLength = urls.length;
      console.log(urlsLength);
      const newsData: Page[] = [];
      for(let i = 0; i < urlsLength; i++) {
        console.log(`${i}/${urlsLength}`);
        const url = urls[i];
        if(url && (url.includes("news-") || url.includes("features-"))) {
          console.log(url);
          newsData.push(await this.parseNews(url, browser));
        }
      }

      return newsData;

    } catch (error) {
      console.log(error);
    } finally {
      await browser.close();
    }
  }

  private async parseNews(url: string, browser: any): Promise<Page> {
    const page = await browser.newPage();

    try {
      await page.goto(url);

      const title: any  = await page.$eval(".story-body__h1", elem => elem.innerText);
      const author: any = await page.$eval(".byline", elem => elem.innerText);
      const content: any = await page.$eval(".story-body__inner", elem => elem.innerText);

      //console.log(title);
      //console.log(author);
      //console.log(content);

      return new Page(title, content, author, url);
    } catch (error) {
      //console.log(error);
    }
  }
}

export default Parser;