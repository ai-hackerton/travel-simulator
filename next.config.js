module.exports = {
  module: {
    rules: [
      {
        test: /\.geojson$/,
        loader: "jsonc-loader",
        type: "javascript/auto",
      },
    ],
  },
};
