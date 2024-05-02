import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { ConnectionOptions, ConsumerConfig, NatsConnection, StringCodec, connect } from 'nats';

export class JetstreamTransporter extends Server implements CustomTransportStrategy {
  constructor(
    private readonly connectionOptions: ConnectionOptions,
    private readonly consumerOptions: ConsumerConfig
  ) {
    super();
  }

  private stan?: NatsConnection;

  public async getClient(): Promise<NatsConnection> {
    if (!this.stan) {
      this.stan = await connect(this.connectionOptions);
    }
    return this.stan;
  }

  public async listen(callback: () => void) {
    this.bindEventHandlers();
    callback();
  }

  public close() {
    this.stan && this.stan.close();
  }

  // Implement other necessary methods here
  private async bindEventHandlers() {
    const registeredPatterns = Array.from(this.messageHandlers.keys());
    if (!registeredPatterns.length) {
      console.info('No message handlers registered');
      return;
    }
    const stan = await this.getClient();
    const js = stan.jetstream();
    const jsm = await stan.jetstreamManager();

    for (const subject of registeredPatterns) {
      try {
        const streamName = subject.split('.')[0];
        const hashName = btoa(`${this.connectionOptions.name}.${subject}`);
        const consumerConfig = {
          ...this.consumerOptions,
          durable_name: this.consumerOptions.durable_name ?? hashName,
          filter_subject: subject,
        };
        const cinfo = await jsm.consumers.add(streamName, consumerConfig);
        const c = await js.consumers.get(streamName, cinfo.name);
        await c.consume({
          callback: async (msg) => {
            const handler = this.getHandlerByPattern(subject);
            const sc = StringCodec();
            const data = JSON.parse(sc.decode(msg.data));
            if (handler) {
              this.transformToObservable(await handler(data, msg));
            }
          },
        });
        console.info(`Subscribed to ${subject} event with consumer ${cinfo.name} in stream ${cinfo.stream_name}.`);
      } catch (error) {
        console.error(`Error setting up consumer for ${subject}:`, error);
      }
    }
  }
}
