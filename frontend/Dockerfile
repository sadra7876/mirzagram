FROM node:18.18.0
WORKDIR /mirzagram-frontend
COPY package.json .
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8000
CMD [ "npm" ,"run", "preview" ]