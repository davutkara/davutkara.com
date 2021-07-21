FROM node:lts-alpine

WORKDIR /usr/app
# install the vue-cli
RUN npm install --quiet --global @vue/cli