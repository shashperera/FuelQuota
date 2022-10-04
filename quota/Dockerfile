FROM node:12.4-alpine

WORKDIR /quota/quotas

RUN npm install

COPY . .

LABEL maintainer="Quotas"

CMD ["node","quota/quotas.js" ]
