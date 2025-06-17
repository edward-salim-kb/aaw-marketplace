FROM node:18.18.2 AS builder

WORKDIR /wishlist-service

COPY package.json ./

# Install pnpm
RUN npm install -g pnpm typescript tsx

# Install dependencies
RUN pnpm install

# Copy source
COPY . .

# Build
RUN pnpm run build

# Production image
FROM node:18.18.2-slim

ENV NODE_ENV=production
ENV PORT=5005

WORKDIR /wishlist-service

COPY --from=builder /wishlist-service/dist ./dist
COPY --from=builder /wishlist-service/package.json ./package.json

RUN npm install --only=production

CMD ["node", "dist/server.js"]

EXPOSE 5005