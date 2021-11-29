import * as Sentry from "@sentry/nextjs";

const sentryDsn: string | undefined = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (!sentryDsn) {
  console.log("no NEXT_PUBLIC_SENTRY_DSN set, not initializing client !");
} else {
  Sentry.init({
    dsn: sentryDsn,
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    tracesSampleRate: 1.0,
  });
}
