FROM node:alpine as development

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]