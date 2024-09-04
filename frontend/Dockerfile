FROM node:21.1.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --cache /tmp/empty-cache --prefer-offline

ENV PATH /app/node_modules/.bin:$PATH

COPY . .


ARG BUILD_MODE
ENV RUNTIME_BUILD_MODE=${BUILD_MODE}
RUN npm run build:${RUNTIME_BUILD_MODE}

FROM nginx:alpine3.20 AS runner


COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]