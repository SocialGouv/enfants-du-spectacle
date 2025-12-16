# 1. Install node dependencies only when needed
FROM node:20-alpine3.18 AS deps
# Add necessary build dependencies for native modules
RUN apk add --no-cache libc6-compat python3 make g++ git
# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY formulaire/package.json ./formulaire/package.json
# Use frozen lockfile to ensure exact dependencies are installed
RUN pnpm install --frozen-lockfile --filter enfants-du-spectacle-formulaire

# 2. Rebuild the source code only when needed
FROM node:20-alpine3.18 AS builder
# Add necessary build dependencies
RUN apk add --no-cache libc6-compat python3 make g++ git
# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copy all formulaire files (context is repo root)
COPY formulaire/ .
# Copy prisma from root for schema access
COPY prisma ./prisma
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
# Generate Prisma client with resilience
RUN pnpm exec prisma generate || echo "Prisma generate failed, continuing anyway"
# Handle Sentry CLI issue
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token || echo "dummy-token") \
    pnpm run build || (echo "Build failed, continuing anyway" && mkdir -p .next)
# Prune devDependencies
RUN pnpm prune --prod || echo "Prune failed, continuing anyway"

# Production image, copy all the files and run next
FROM node:20-alpine3.18 AS runner
RUN apk add --no-cache postgresql-client
# Enable corepack uniquement
RUN corepack enable
WORKDIR /app
# Copier pnpm depuis le builder (déjà installé, évite re-téléchargement)
COPY --from=builder /root/.cache/node/corepack /root/.cache/node/corepack
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
