FROM --platform=linux/amd64 node:alpine

COPY package.json package.json

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"] 