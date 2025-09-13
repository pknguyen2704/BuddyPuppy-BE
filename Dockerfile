# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app /app

# Chỉ định cổng Cloud Run sẽ expose
ENV PORT=8080

# Start app
CMD ["node", "build/src/server.js"]
