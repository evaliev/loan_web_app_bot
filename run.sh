#!/bin/sh
./default.template.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'
