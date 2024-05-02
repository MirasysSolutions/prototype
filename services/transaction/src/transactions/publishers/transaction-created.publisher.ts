import { EventPublisher, Topics, TransactionCreatedEvent } from 'common';

class TransactionCreatedPublisher extends EventPublisher<TransactionCreatedEvent> {
  readonly topic: TransactionCreatedEvent['metadata']['name'] =
    Topics.TransactionCreated;

  async publish(event: TransactionCreatedEvent): Promise<void> {
    console.info('publishing event', event);
    await this.client.publish(
      this.topic,
      JSON.stringify({
        metadata: { name: this.topic },
        data: {
          accountNumber: event.data.accountNumber,
          amount: event.data.amount,
        },
      }),
    );
  }
}

export { TransactionCreatedPublisher };
