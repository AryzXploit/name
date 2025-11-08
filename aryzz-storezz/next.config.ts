import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-inline';",
  "style-src 'self' 'unsafe-inline';",
  "img-src 'self' data: https:;",
  "font-src 'self';",
  "connect-src 'self';",
  "frame-ancestors 'none';",
  "form-action 'self';",
  "base-uri 'self';",
  "upgrade-insecure-requests;",
].join(" ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
