FROM node:18.0-alpine3.14 as build

WORKDIR /app

COPY package.json .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install 

COPY . .

RUN npm run build

FROM node:18.0-alpine3.14 as production

COPY --from=build /app/dist /app
COPY --from=build /app/package.json /app/package.json

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD ["node", "/app/main.js"]