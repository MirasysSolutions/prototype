FROM node:20-alpine
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
WORKDIR /app
COPY package.json package-lock.json ./
COPY nx.json ./
COPY packages ./packages
COPY services/transaction ./services/transaction
RUN npm ci
RUN npx nx build transaction
CMD ["npm", "-w", "transaction", "run", "start:prod"]