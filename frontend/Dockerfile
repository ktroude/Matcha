FROM node:latest
WORKDIR /app
COPY ./frontend ./
RUN npm install -g serve
RUN npm install && npm run build
EXPOSE 5173
CMD  npm run dev