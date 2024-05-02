import { Module } from '@nestjs/common';
import { NatsService } from 'common';
import { readFileSync } from 'fs';
import {
  AckPolicy,
  ConnectionOptions,
  ConsumerConfig,
  credsAuthenticator,
} from 'nats';

@Module({
  providers: [
    {
      provide: 'NATS_CONNECTION_OPTIONS',
      useValue: <ConnectionOptions>{
        servers: [process.env.NATS_URL || 'nats://localhost:4222'],
        name: `${process.env.npm_package_name}`,
        noEcho: true,
        debug: false,
        tls: {
          caFile: process.env.NATS_CA_FILE,
          certFile: process.env.NATS_CERT_FILE,
          keyFile: process.env.NATS_KEY_FILE,
        },
        authenticator: credsAuthenticator(
          readFileSync(process.env.NATS_CREDS_FILE),
        ),
      },
    },
    {
      provide: 'NATS_CONSUMER_OPTIONS',
      useValue: <ConsumerConfig>{
        deliver_group: process.env.npm_package_name,
        max_ack_pending: parseInt(process.env.NATS_MAX_ACK_PENDING || '100'),
        ack_policy: AckPolicy.Explicit,
      },
    },
    NatsService,
  ],
  exports: ['NATS_CONNECTION_OPTIONS', 'NATS_CONSUMER_OPTIONS', NatsService],
})
export class NatsModule {}
