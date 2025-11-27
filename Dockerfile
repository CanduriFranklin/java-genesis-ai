# Dockerfile for Vite + React + TypeScript app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install --frozen-lockfile || yarn install --frozen-lockfile
COPY . .
RUN npm run build || yarn build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
