const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.tsx",
    option: "./src/option.ts"
  },
  output: {
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "src/manifest.json"
      },
      { from: "node_modules/crx-hotreload/hot-reload.js" },
      {
        from: "node_modules/webextension-polyfill/dist/browser-polyfill.js"
      },
      {
        from: "src/options.html"
      }
    ])
  ]
};
