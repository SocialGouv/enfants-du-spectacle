/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");


const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

// Only enable Sentry's webpack plugin when all required env vars are present.
// Otherwise, local/dev builds can fail with `sentry-cli` errors.
const hasSentry =
  !!process.env.SENTRY_AUTH_TOKEN &&
  !!process.env.SENTRY_ORG &&
  !!process.env.SENTRY_PROJECT;

module.exports = hasSentry
  ? withSentryConfig(nextConfig, { silent: true })
  : nextConfig;
