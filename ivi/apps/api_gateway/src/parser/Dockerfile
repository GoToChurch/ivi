FROM python:3.9

WORKDIR /usr/src/app

COPY package*.json .

RUN pip install selenium webdriver-manager

COPY . .