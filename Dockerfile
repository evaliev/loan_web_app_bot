FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

WORKDIR /app

RUN yarn && yarn build

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY ./default.template.conf ./default.template.conf
COPY ./run.sh ./run.sh


EXPOSE 8080
ENTRYPOINT ["/bin/sh" , "-c", "envsubst '${SERVER_NAME}' < ./default.template.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
