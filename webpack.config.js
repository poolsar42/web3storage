const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/",
    filename: "bundle.js",
  },
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-env"],
        },
      },
      {
        test: /\.css$/i,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  // * IN CASE I WANT TO DO STUFF MANUALLY
  // resolve: {
  //   alias: {
  //     url: require.resolve("url/"),
  //     https: require.resolve("https-browserify"),
  //     http: require.resolve("stream-http"),
  //     crypto: require.resolve("crypto-browserify"),
  //     assert: require.resolve("assert/"),
  //     stream: require.resolve("stream-browserify"),
  //   },
  // },
};
