# FROM node:18.18.0
# WORKDIR /mirzagram-frontend
# COPY package*.json ./
# COPY .pnp* ./
# RUN npm install --verbose
# RUN npm i -g serve
# COPY . .
# RUN npm run build
# EXPOSE 8000
# CMD [ "serve", "-s", "dist" ]

FROM node:18.18.0
WORKDIR /mirzagram-frontend
COPY package*.json .
COPY .pnp* .
RUN npm install --verbose
RUN npm run build
COPY . .
EXPOSE 8000
CMD [ "npm" ,"run", "preview" ]