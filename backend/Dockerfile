FROM node:18.18.0
WORKDIR /mirzagram-backend
COPY package*.json .
COPY .yarnrc* .
COPY .pnp* .
RUN yarn install
COPY . .
EXPOSE 2000
CMD [ "yarn" , "start" ]