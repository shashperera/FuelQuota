FROM node:12.4-alpine

WORKDIR /vehicle/vehicles
RUN npm install

COPY . .

LABEL maintainer="Vehicles"

CMD ["node","vehicle/vehicles.js" ]
a