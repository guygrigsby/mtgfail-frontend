const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8081",
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/public",
    port: 8081
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /(\.sass|\.css)$/,
        use: ["style-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()
  ]
};
