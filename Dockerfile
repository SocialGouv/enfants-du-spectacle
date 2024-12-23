# from https://nextjs.org/docs/deployment#docker-image

# 1. Install node dependencies only when needed
FROM node:20-alpine3.18 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn fetch --immutable && yarn cache clean

# 2. Rebuild the source code only when needed
FROM node:20-alpine3.18 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# cf https://github.com/webpack/webpack/issues/14532
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NODE_ENV=production
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT
ENV NEXT_PUBLIC_SENTRY_ENVIRONMENT=$NEXT_PUBLIC_SENTRY_ENVIRONMENT
ARG NEXT_PUBLIC_AGENT_HJID
ENV NEXT_PUBLIC_AGENT_HJID=$NEXT_PUBLIC_AGENT_HJID
ARG NEXT_PUBLIC_AGENT_HJSV
ENV NEXT_PUBLIC_AGENT_HJSV=$NEXT_PUBLIC_AGENT_HJSV
ARG NEXT_PUBLIC_FORMULAIRE_HJID
ENV NEXT_PUBLIC_FORMULAIRE_HJID=$NEXT_PUBLIC_FORMULAIRE_HJID
ARG NEXT_PUBLIC_FORMULAIRE_HJSV
ENV NEXT_PUBLIC_FORMULAIRE_HJSV=$NEXT_PUBLIC_FORMULAIRE_HJSV
ARG NEXT_PUBLIC_API_URL_SDP
ENV NEXT_PUBLIC_API_URL_SDP=$NEXT_PUBLIC_API_URL_SDP
ARG NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ENV NEXT_PUBLIC_MATOMO_SITE_AGENT_ID=$NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ARG NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID=$NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ENV SENTRY_URL=https://sentry.fabrique.social.gouv.fr
ENV SENTRY_PROJECT=app-enfants-du-spectacle
ENV SENTRY_ORG=incubateur
RUN --mount=type=secret,id=sentry_auth_token export SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token); \
  npm run build
RUN yarn workspaces focus --production && yarn cache clean
# this should remove dev node module dependencies
RUN npx prisma generate

# Production image, copy all the files and run next
FROM node:20-alpine3.18 AS runner
RUN apk add --no-cache postgresql-client
WORKDIR /app
ENV NODE_ENV production
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_SENTRY_DSN
ENV NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG NEXT_PUBLIC_SENTRY_ENVIRONMENT
ENV NEXT_PUBLIC_SENTRY_ENVIRONMENT=$NEXT_PUBLIC_SENTRY_ENVIRONMENT
ARG NEXT_PUBLIC_AGENT_HJID
ENV NEXT_PUBLIC_AGENT_HJID=$NEXT_PUBLIC_AGENT_HJID
ARG NEXT_PUBLIC_AGENT_HJSV
ENV NEXT_PUBLIC_AGENT_HJSV=$NEXT_PUBLIC_AGENT_HJSV
ARG NEXT_PUBLIC_FORMULAIRE_HJID
ENV NEXT_PUBLIC_FORMULAIRE_HJID=$NEXT_PUBLIC_FORMULAIRE_HJID
ARG NEXT_PUBLIC_FORMULAIRE_HJSV
ENV NEXT_PUBLIC_FORMULAIRE_HJSV=$NEXT_PUBLIC_FORMULAIRE_HJSV
ARG NEXT_PUBLIC_API_URL_SDP
ENV NEXT_PUBLIC_API_URL_SDP=$NEXT_PUBLIC_API_URL_SDP
ARG NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ENV NEXT_PUBLIC_MATOMO_SITE_AGENT_ID=$NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ARG NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID=$NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/package.json .
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/.next ./.next

USER 1000
EXPOSE 3000
ARG START_SCRIPT=start-prod
ENV START_SCRIPT=$START_SCRIPT
CMD ["sh", "-c", "yarn run $START_SCRIPT"]
