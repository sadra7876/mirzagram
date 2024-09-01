FROM node:21.1.0-alpine
WORKDIR /mirzagram-backend
COPY package*.json .
COPY .yarnrc* .
COPY .pnp* .
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn" , "start" ]