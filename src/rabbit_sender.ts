const  amqp = require('amqplib/callback_api');

import Page from "./page";

class RabbitSender {
  private url: string;

  constructor (url: string) {
    this.url = url;
  }

  public sendMessage (queue: string, data: string) {
    amqp.connect(this.url, function(connectError, connection) {
      if (connectError) {
        throw connectError;
      }
      connection.createChannel(function(channelError, channel) {
        if (channelError) {
          throw channelError;
        }

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(data));
      });
    });
  }
}

export default RabbitSender;