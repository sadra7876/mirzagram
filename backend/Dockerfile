FROM node:21.1.0-alpine AS alpine

# - - - - - -
    
FROM alpine AS base
WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .

# - - - - - -
    
FROM base AS builder
WORKDIR /app

COPY --from=base /app/ .

RUN yarn build 

RUN cp -r ./src/docs ./dist/src/docs
RUN rm -rf ./src
RUN rm -rf ./__test__

# - - - - - -

FROM alpine AS runner
WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

# Health check configuration
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

CMD node ./dist/src/main.js