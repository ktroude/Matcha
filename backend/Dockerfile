FROM node:latest
ARG LICENSE_KEY 
COPY ./backend ./
RUN npm i
#RUN cd node_modules/geoip-lite && npm run-script updatedb license_key
EXPOSE 3000
CMD npm run start:dev