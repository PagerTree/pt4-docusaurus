# Build stage: Build Docusaurus static files
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the Docusaurus project
COPY . .

# Build the static site
RUN yarn build

# Serve stage: Use Caddy to serve static files
FROM caddy:2-alpine

# Copy static files from the build stage
COPY --from=builder /app/build /srv

# Copy Caddyfile for configuration
COPY Caddyfile /etc/caddy/Caddyfile
