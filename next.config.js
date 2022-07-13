/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'fa'],
    defaultLocale: 'fa',
  },
}

module.exports = nextConfig
