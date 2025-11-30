#!/bin/sh
set -e

# This script will substitute environment variables in the nginx config template
# and then start the nginx server.

# The PORT variable is passed by Cloud Run. Default to 8080 if not set.
export PORT=${PORT:-8080}

# Substitute the variable and create the final config file.
envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf

# Start nginx in the foreground
exec nginx -g 'daemon off;'
