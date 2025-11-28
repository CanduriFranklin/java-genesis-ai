#!/bin/sh
# Use envsubst to replace the port in the nginx config template
envsubst '
${PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
