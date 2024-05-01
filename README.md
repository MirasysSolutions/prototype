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