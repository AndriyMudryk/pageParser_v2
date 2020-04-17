const cron = require("node-cron");

import Parser from "./page_parser";
import RabbitSender from "./rabbit_sender";

class CronTimer {
  public task: any;

  constructor (timeString: string, task: Function) {
    this.task = cron.schedule(timeString, task);
  }

  public start(): void {
    this.task.start();
  }

  public stop(): void {
    this.task.stop();
  }
}

const parser = new Parser('https://www.bbc.com/ukrainian/news');
const sender = new RabbitSender('amqp://localhost');

export default new CronTimer ("33 * * * *", () => {
  return parser.parsePage().then(
    function(pages) {
      pages.map(page => {
        if(!page) {
          return false;
        }
        return sender.sendMessage("pages", page.getData())
      })
    }
  );
});
