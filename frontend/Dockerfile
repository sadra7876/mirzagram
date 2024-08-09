FROM node:18.18.0
WORKDIR /mirzagram-frontend
COPY package*.json .
COPY .pnp* .
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm" ,"run", "dev" ]