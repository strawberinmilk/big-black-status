FROM node:20.10-alpine

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo
WORKDIR /app

RUN apk update

COPY ./frontend/* ./
COPY ./frontend/package.json ./

RUN yarn install
