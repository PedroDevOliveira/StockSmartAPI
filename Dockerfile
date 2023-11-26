# Stage 1 installing dependencies
FROM node:20.9.0-alpine AS installer

WORKDIR /dependencies

COPY package.json .
COPY yarn.lock .

RUN yarn install --silent

# Stage 2 building the code
FROM node:20.9.0-alpine AS builder

WORKDIR /build

COPY . .

COPY --from=installer /dependencies/node_modules /build/node_modules

RUN yarn run build

# Stage 3 running the code
FROM node:20.9.0-alpine AS app
LABEL STAGE='BACKEND'

WORKDIR /var/www

COPY --from=installer /dependencies/node_modules ./node_modules

COPY --from=builder /build/dist ./dist

RUN apk add --no-cache bash nano

EXPOSE 3000

CMD ["node", "dist/main"]