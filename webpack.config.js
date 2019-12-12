const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/index.tsx",
    option: "./src/option.ts",
    background: "./src/background.ts"
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
      {
        from: "src/options.html"
      }
    ])
  ]
};
