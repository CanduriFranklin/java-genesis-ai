#!/bin/sh
# Use the PORT environment variable provided by Cloud Run, default to 8080
port=${PORT:-8080}

# Replace the 'listen' directive in the Nginx configuration
# The 'g' flag ensures all occurrences are replaced, just in case.
sed -i "s/listen 8080;/listen ${port};/g" /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
exec nginx -g 'daemon off;'
