// webpack needs to be explicitly required
const webpack = require("webpack");
const path = require("path");

module.exports = {
  //* "BABEL-POLUFILL TO HANDLE ASYNC/AWAIT IN BROWSER"
  entry: ["@babel/polyfill", "./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/public/",
    filename: "bundle.js",
  },
  plugins: [
    //* TO SOLVE PROBLEM "PROCESS IS NOT DEFINED"
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],

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
      //* TO HANDLE CSS
      {
        test: /\.css$/i,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      //* TO HANDLE DIFFERENT FILES
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      //* THIS ONE TO HANDLE MJS FILES
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  // * IN CASE I WANT TO DO STUFF MANUALLY
  resolve: {
    alias: {
      url: require.resolve("url/"),
      //     https: require.resolve("https-browserify"),
      //     http: require.resolve("stream-http"),
      //     crypto: require.resolve("crypto-browserify"),
      //     assert: require.resolve("assert/"),
      //     stream: require.resolve("stream-browserify"),
    },
  },
};
