FROM node:lts-alpine3.18@sha256:c8245ebe9d86862ab40bbaee04f69f9787c57b83beb6e9a174e8afc154989e1f

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]