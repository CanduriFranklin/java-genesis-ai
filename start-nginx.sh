#!/bin/sh
# Set the port to the value of the PORT environment variable, or 8080 if it's not set.
export PORT="${PORT:-8080}"

# Use envsubst to replace the port in the nginx config template
envsubst '${PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Print out the generated config file for debugging
echo "--- Generated Nginx Config ---"
cat /etc/nginx/conf.d/default.conf
echo "------------------------------"

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
