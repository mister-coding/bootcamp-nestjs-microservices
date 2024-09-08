FROM node:18-alpine AS base

FROM base AS builder

WORKDIR /usr/src/app


COPY package*.json ./

RUN yarn install

COPY . .


RUN yarn prisma generate

RUN yarn prisma generate --schema ./prisma/schema_mongo.prisma


RUN yarn build payment

FROM base AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/config ./config
COPY --from=builder /usr/src/app/mail ./mail
COPY --from=builder /usr/src/app/constant ./constant
COPY --from=builder /usr/src/app/types ./types
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules


CMD [ "node", "dist/apps/payment/main.js" ]