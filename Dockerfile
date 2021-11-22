# from https://nextjs.org/docs/deployment#docker-image

# 1. Install node dependencies only when needed
FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
# cf https://github.com/webpack/webpack/issues/14532
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV=production
ARG DEPLOY_URL
ENV NEXTAUTH_URL=$DEPLOY_URL
ENV NEXT_PUBLIC_APP_BASE_URL=$DEPLOY_URL
RUN npm run build
RUN npm ci --production --ignore-scripts
# this should remove dev node module dependencies
RUN npx prisma generate

# Production image, copy all the files and run next
FROM node:alpine AS runner
RUN apk add --no-cache postgresql-client
WORKDIR /app
ENV NODE_ENV production
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NEXT_TELEMETRY_DISABLED 1
ARG DEPLOY_URL
ENV NEXTAUTH_URL=$DEPLOY_URL

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package.json .
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/.next ./.next

USER node
EXPOSE 3000
ARG START_SCRIPT=start-prod
ENV START_SCRIPT=$START_SCRIPT
CMD ["sh", "-c", "npm run $START_SCRIPT"]
