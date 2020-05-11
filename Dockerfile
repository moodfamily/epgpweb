FROM node:12

WORKDIR /usr/src/app

ADD . /usr/src/app
RUN chmod +x ./wait_for.sh
RUN npm ci
RUN npm run build
