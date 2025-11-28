# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.21.0-alpine

# Install gettext for envsubst
RUN apk add --no-cache gettext

# Copy the built assets from the build stage first
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration template and the startup script
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY start-nginx.sh /start-nginx.sh
RUN chmod +x /start-nginx.sh

# Expose port 8080 - This is informational for Docker, Cloud Run uses the PORT env var
EXPOSE 8080

# Run the startup script
CMD ["/start-nginx.sh"]
