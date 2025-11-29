# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

# Copy only the dependency files first to take advantage of the cache
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the code
COPY . .


# Generate the production build
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:1.21.0-alpine

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Update the default Nginx configuration to listen on port 8080.
# This is the only change needed for Cloud Run.
RUN sed -i 's/listen   80;/listen   8080;/' /etc/nginx/conf.d/default.conf

# Expose the port Cloud Run expects
EXPOSE 8080

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
