import type { NextConfig } from "next";

const scriptSources = [
  "'self'",
  "blob:",
  "'unsafe-inline'",
  "'unsafe-eval'",
  "'wasm-unsafe-eval'",
  "https://www.google.com",
  "https://www.gstatic.com",
  "https://googleads.g.doubleclick.net",
  "https://www.googleadservices.com",
  "https://pagead2.googlesyndication.com",
  "https://tpc.googlesyndication.com",
  "https://adservice.google.com",
  "https://cdn.jsdelivr.net",
];

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: blob:",
  "style-src 'self' 'unsafe-inline'",
  `script-src ${scriptSources.join(" ")}${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  "worker-src 'self' blob:",
  "connect-src 'self' https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://cdn.jsdelivr.net https://huggingface.co https://*.hf.co blob:",
  "frame-src 'self' blob: https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com",
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/photo-editor", destination: "/openshop/index.html" },
        { source: "/openshop", destination: "/openshop/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  webpack(config, { isServer, webpack }) {
    if (!isServer) {
      // pdfstudio has Node-only fallbacks that cannot execute in a browser.
      config.plugins.push(new webpack.IgnorePlugin({ resourceRegExp: /^node:/ }));
    }
    return config;
  },
};

export default nextConfig;
