interface PublisherClient {
  publish(topic: string, data: string): Promise<void>;
}
export { PublisherClient };
