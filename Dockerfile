FROM node:16.16.0-alpine3.16
WORKDIR /app
COPY ./ ./
# Install base dependencies
RUN npm install sfdx-cli -g
ENV API_URL=http://localhost:3000/