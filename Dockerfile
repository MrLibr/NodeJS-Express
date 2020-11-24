FROM node:12

RUN mkdir -p /usr/node-app/
WORKDIR /usr/node-app/

COPY . /usr/node-app/
RUN npm install
RUN npm audit fix

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
