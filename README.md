# Prototype

## Container

```bash
docker run -it --rm -v $(pwd):/app -w /app node:20-alpine sh # npm install -g npm@latest
```

## Note

Generate new NestJS project

```bash
npx @nestjs/cli new account --language TS --package-manager npm --skip-git --skip-install
npx @nestjs/cli new transaction --language TS --package-manager npm --skip-git --skip-install
```

Export JetStream

```bash
nats stream info STRAM_NAME --json | jq .config > FILE_NAME.json
```

Import JetStream

```bash
nats stream add --config FILE_NAME.json
```

## Build

```bash
docker buildx build --platform linux/amd64,linux/arm64 -f services/account/Dockerfile -t giaduy/account:demo4 . --push
docker buildx build --platform linux/amd64,linux/arm64 -f services/transaction/Dockerfile -t giaduy/transaction:demo4 . --push
```

## Publish Events

```bash
nats pub legacyAccount.created --count=5 --sleep 1s '{"metadata":{"name":"legacyAccount.created"},"data":{"accountNumber":"BE123000{{Count}}","holderName":"Holder{{Count}}","holderPhone":"+358000{{Count}}","holderAddress":"Address{{Count}}","holderCountry":"FI","balance":0,"version":0}}'

nats pub legacyAccount.updated --count=5 --sleep 1s '{"metadata":{"name":"legacyAccount.created"},"data":{"accountNumber":"FI123000{{Count}}","holderName":"New Holder{{Count}}","holderPhone":"+1330000{{Count}}","holderAddress":"New Address{{Count}}","holderCountry":"US","balance":0,"version":1}}'

nats pub account.sync --count=2 --sleep 1s '{"metadata":{"name":"account.sync"},"data":{"accountNumber":"FI123000{{Count}}","holderName":"Synced Holder{{Count}}","holderPhone":"+1330000{{Count}}","holderAddress":"Synced Address{{Count}}","holderCountry":"US","version":3}}'

nats pub transaction.sync '{"metadata":{"name":"transaction.sync"},"data":{"id":"269c474b-17bf-4a29-81d0-03a28ca43714","accountNumber":"FI1230002","amount":10,"date":"2024-05-03T07:36:08.045Z","note":"addednote","version":1}}'

nats pub legacyTransaction.created '{"metadata":{"name":"legacyTransaction.created"},"data":{"id":"269c474b-17bf-4a29-81d0-13a28ca43710","accountNumber":"FI1230002","amount":10,"date":"2024-05-03T07:36:08.045Z","note":"addednote","version":0}}'

nats pub legacyTransaction.updated '{"metadata":{"name":"legacyTransaction.updated"},"data":{"id":"269c474b-17bf-4a29-81d0-13a28ca43710","accountNumber":"FI1230002","amount":10,"date":"2024-05-03T07:36:08.045Z","note":"new note","version":1}}'

nats pub transaction.sync '{"metadata":{"name":"transaction.sync"},"data":{"id":"269c474b-17bf-4a29-81d0-13a28ca43710","accountNumber":"FI1230002","amount":10,"date":"2024-05-03T07:36:08.045Z","note":"BTC payment","version":3}}'

```
