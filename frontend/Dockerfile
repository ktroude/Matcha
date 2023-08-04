FROM node:latest
WORKDIR /app
COPY ./frontend ./
RUN npm install -g serve
RUN npm install -g sass
RUN npm install esbuild
RUN npm install svelte-preprocess @rollup/plugin-typescript typescript tslib @tsconfig/svelte --save-dev
RUN npm install
EXPOSE 8080
CMD npm run dev