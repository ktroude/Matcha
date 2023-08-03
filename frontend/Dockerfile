FROM node:latest
WORKDIR /app
COPY ./frontend ./
RUN npm install -g serve
# RUN npm install -g sass
# RUN npm install -g vite
RUN npm install
EXPOSE 8080
CMD npm run dev