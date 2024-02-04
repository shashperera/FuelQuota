# Lightweight base image
FROM node:12.4-alpine

WORKDIR /vehicle/vehicles
RUN npm install

# Copy the current directory into the container
COPY . .

# Label for the image indicating the maintainer
LABEL maintainer="Vehicles"

# Command to run when the container starts
CMD ["node","vehicle/vehicles.js" ]
a
