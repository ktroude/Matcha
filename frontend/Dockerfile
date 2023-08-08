FROM node:latest
WORKDIR /src/app
COPY ./frontend ./
RUN npm install && npm run build
EXPOSE 8080
CMD  npm run dev