FROM node:12.4-alpine

WORKDIR /auth/auths

RUN npm install

COPY . .

LABEL maintainer="Authentication"

CMD ["node","auth/auths.js" ]
