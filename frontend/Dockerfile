FROM node:latest
WORKDIR /app
COPY ./frontend ./
RUN npm install -g sass
RUN npm install
EXPOSE 8080
CMD npm run dev