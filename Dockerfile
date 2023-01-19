FROM node:16.16.0-alpine3.16
# create app group and user called app
#RUN addgroup app && adduser -S -G app app
#USER app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV API_URL=http://localhost:3000/
EXPOSE 3000
CMD ["npm", "start"]