/* eslint-disable no-undef */
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env.development"),
    }),
  ],
  devtool: "eval-source-map",
};
