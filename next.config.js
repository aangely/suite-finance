const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {

  assetPrefix: isProd ? "/suite-finance/" : undefined,
  basePath: isProd ? "/suite-finance" : undefined,

  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
