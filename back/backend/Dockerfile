FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++ wget

COPY package*.json ./
RUN npm install -g npm@11 && npm ci --omit=dev

RUN mkdir -p /app/data

COPY . .

ENV PORT=3000
ENV DB_PATH=/app/data/fila.db

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
