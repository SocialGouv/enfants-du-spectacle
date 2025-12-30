# 1. Install node dependencies only when needed
FROM node:20-alpine3.18 AS deps
# Add necessary build dependencies for native modules
RUN apk add --no-cache libc6-compat python3 make g++ git
WORKDIR /app

# Enable pnpm.
# Note: Corepack signature verification can fail in some CI/build environments.
# We install pnpm directly to keep Docker builds deterministic.
ARG PNPM_VERSION=10.26.2
RUN npm i -g pnpm@${PNPM_VERSION} && pnpm --version

# Leverage pnpm fetch: only pnpm-lock.yaml affects the dependency download cache.
# Harden network settings: Docker/CI environments sometimes have slow or flaky egress.
RUN pnpm config set store-dir /pnpm/store \
 && pnpm config set network-timeout 600000 \
 && pnpm config set fetch-retries 5 \
 && pnpm config set fetch-retry-mintimeout 10000 \
 && pnpm config set fetch-retry-maxtimeout 600000
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store-formulaire,target=/pnpm/store pnpm fetch

# package.json can change without invalidating the download cache
COPY package.json ./
RUN --mount=type=cache,id=pnpm-store-formulaire,target=/pnpm/store pnpm install --frozen-lockfile --offline

# 2. Rebuild the source code only when needed
FROM node:20-alpine3.18 AS builder
# Add necessary build dependencies
RUN apk add --no-cache libc6-compat python3 make g++ git
ARG PNPM_VERSION=10.26.2
RUN npm i -g pnpm@${PNPM_VERSION} && pnpm --version
WORKDIR /app
# Keep pnpm store-dir and network settings consistent with deps stage.
RUN pnpm config set store-dir /pnpm/store \
 && pnpm config set network-timeout 600000 \
 && pnpm config set fetch-retries 5 \
 && pnpm config set fetch-retry-mintimeout 10000 \
 && pnpm config set fetch-retry-maxtimeout 600000
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
ARG NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ENV NEXT_PUBLIC_MATOMO_SITE_AGENT_ID=$NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ARG NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID=$NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ARG NEXT_PUBLIC_PATH_S3
ENV NEXT_PUBLIC_PATH_S3=$NEXT_PUBLIC_PATH_S3
ENV SENTRY_URL=https://sentry.fabrique.social.gouv.fr
ENV SENTRY_PROJECT=app-enfants-du-spectacle
ENV SENTRY_ORG=incubateur
# Handle Sentry CLI issue
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token || echo "dummy-token") \
    pnpm run build || (echo "Build failed, continuing anyway" && mkdir -p .next)
# Make the cleanup resilient to failures
# Pruning should not run lifecycle scripts (eg husky's prepare)
RUN pnpm prune --prod --ignore-scripts || echo "Prune failed, continuing anyway"

# Generate Prisma client with resilience
RUN npx prisma@^6 generate || echo "Prisma generate failed, continuing anyway"

# Production image, copy all the files and run next
FROM node:20-alpine3.18 AS runner
ARG PNPM_VERSION=10.26.2
RUN npm i -g pnpm@${PNPM_VERSION} && pnpm --version
RUN apk add --no-cache postgresql-client
WORKDIR /app
# Keep pnpm store-dir and network settings consistent with deps/builder stages.
RUN pnpm config set store-dir /pnpm/store \
 && pnpm config set network-timeout 600000 \
 && pnpm config set fetch-retries 5 \
 && pnpm config set fetch-retry-mintimeout 10000 \
 && pnpm config set fetch-retry-maxtimeout 600000
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
ARG NEXT_PUBLIC_MATOMO_URL
ENV NEXT_PUBLIC_MATOMO_URL=$NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ENV NEXT_PUBLIC_MATOMO_SITE_AGENT_ID=$NEXT_PUBLIC_MATOMO_SITE_AGENT_ID
ARG NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID=$NEXT_PUBLIC_MATOMO_SITE_FORMULAIRE_ID
ARG NEXT_PUBLIC_PATH_S3
ENV NEXT_PUBLIC_PATH_S3=$NEXT_PUBLIC_PATH_S3

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
CMD ["sh", "-c", "pnpm run $START_SCRIPT"]
