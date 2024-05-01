import { PublisherClient } from '../interfaces';

type Event = {
  metadata: {
    name: string;
  };
  data: unknown;
};

abstract class EventPublisher<T extends Event> {
  abstract readonly topic: T['metadata']['name'];
  protected client: PublisherClient;

  constructor(client: PublisherClient) {
    this.client = client;
  }

  async publish(data: T): Promise<void> {
    await this.client.publish(this.topic, JSON.stringify(data));
  }
}

export { EventPublisher };
