FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "dev"]