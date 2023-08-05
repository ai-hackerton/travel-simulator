/** @type {import('next').NextConfig} */
const nextConfig = {
  module: {
    rules: [
      {
        test: /\.geojson$/,
        loader: "jsonc-loader",
        type: "javascript/auto",
      },
    ],
  },
  images: {
    domains: ['tong.visitkorea.or.kr']
  }
}

module.exports = nextConfig
