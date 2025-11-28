# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Remove default Nginx static assets
RUN rm -rf ./*
# Copy built assets from the builder stage
COPY --from=builder /app/dist .
# Expose port 80
EXPOSE 80
# Start Nginx and serve the app
CMD ["nginx", "-g", "daemon off;"]
