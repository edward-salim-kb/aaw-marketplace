FROM node:18.18.2 AS builder

WORKDIR /auth-service

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
ENV PORT=5001

WORKDIR /auth-service

COPY --from=builder /auth-service/dist ./dist
COPY --from=builder /auth-service/package.json ./package.json

RUN npm install --only=production

CMD ["node", "dist/server.js"]

EXPOSE 5001