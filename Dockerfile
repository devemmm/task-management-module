FROM node:18.16.0 as build 
WORKDIR /react-app

COPY package*.json yarn.lock /react-app/
RUN yarn install

COPY ./ /react-app/

RUN yarn run build
FROM nginx:1.19

COPY /nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/dist /usr/share/nginx/html