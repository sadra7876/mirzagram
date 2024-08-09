FROM node:18.18.0
WORKDIR /mirzasaz-backend
COPY package*.json .
COPY yarn.lock .
COPY .yarnrc* .
COPY .pnp* .
RUN yarn install
COPY . .
EXPOSE 2000
CMD [ "yarn" , "start" ]