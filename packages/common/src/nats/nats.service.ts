import { Inject, Injectable } from '@nestjs/common';
import { JetstreamTransporter } from './jetstream.transporter';
import { ConnectionOptions, ConsumerConfig, StringCodec } from 'nats';

interface PublisherClient {
  publish(topic: string, data: string): Promise<void>;
}

@Injectable()
export class NatsService implements PublisherClient {
  private transporter: JetstreamTransporter;

  constructor(
    @Inject('NATS_CONNECTION_OPTIONS')
    private connectionOptions: ConnectionOptions,
    @Inject('NATS_CONSUMER_OPTIONS')
    private consumerOptions: ConsumerConfig
  ) {
    this.transporter = new JetstreamTransporter(this.connectionOptions, this.consumerOptions);
  }

  get strategy() {
    return this.transporter;
  }

  async publish(topic: string, data: string): Promise<void> {
    const client = await this.transporter.getClient();
    const js = client.jetstream();
    const sc = StringCodec();
    js.publish(topic, sc.encode(data));
  }
}
