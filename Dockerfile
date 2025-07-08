FROM node:18.20.4-alpine3.20 AS builder

WORKDIR /app

# Copy only package.json and yarn.lock first for caching
COPY package.json yarn.lock ./
# Use --immutable for stricter dependency resolution
RUN yarn install --frozen-lockfile --immutable
# Copy the rest of the Docusaurus project files
COPY . .
# Build only what's needed, combine commands to reduce layers
RUN yarn build:docs && yarn build:blog && yarn build:learn

# Serve stage: Use a specific Caddy version for reproducibility
FROM caddy:2.8.4-alpine

# Copy static files from the build stage
COPY --from=builder /app/build /srv

# Copy Caddyfile and robots.txt, combine to reduce layers
COPY Caddyfile /etc/caddy/Caddyfile
COPY robots.txt /srv/{blog,learn,docs}/robots.txt
