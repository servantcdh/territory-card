const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  // entry: 웹팩이 js를 읽기 시작하는 지점
  entry: {
    main: "./src/index.js",
  },
  // output: 웹팩이 번들을 내보내는 지점
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
      return `${filepath}/[name].[hash][ext][query]`;
    },
  },
  devServer: {
    port: 4200,
    client: {
      overlay: {
        errors: true,
      },
    },
    // hot: Hot Module Replacement 옵션, 변동된 모듈만 리렌더링
    hot: true,
  },
  // optimization: 빌드 최적화 옵션을 정의
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                },
              },
            }),
          ]
        : [],
  },
  // externals: 명시된 모듈은 후처리에서 제외
  externals: {},
  // module: 웹팩이 읽어온 파일들을 모듈화하는 지점
  module: {
    // rules: 읽어온 파일의 모듈 변환 로직(로더)을 정의
    rules: [
      {
        // test: 읽어올 파일명 규칙을 정규식으로 정의
        test: /\.css$/,
        // use: 사용할 로더가 2개 이상일 때 쓰는 프로퍼티, 배열 마지막 요소부터 역순으로 실행됨
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        // type[ asset/resource ]: 위의 정적 파일을 모듈로 사용 (webpack4의 file-loader를 대체)
        type: "asset/resource",
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        // type[ asset > parser > dataUrlCondition > maxSize ]: 정의한 용량보다 작은 이미지들은 dataUrl로 변환 (webpack4의 url-loader/limit를 대체)
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
      },
      {
        test: /\.js$/,
        // loader: 사용할 로더가 1개일 때 쓰는 프로퍼티
        loader: "babel-loader",
        // exclude: 읽어올 대상에서 제외할 파일명 규칙을 정규식으로 정의, test의 반대
        exclude: /node_modules/,
      },
    ],
  },
  // plugins: 번들된 결과물을 후처리하는 로직(플러그인)을 정의
  plugins: [
    // BannerPlugin: 번들된 결과물 최상단에 삽입할 값을 정의
    new webpack.BannerPlugin({
      banner: `
          Build Date: ${new Date().toLocaleString()}
          Commit Version: ${childProcess.execSync("echo de0392e")}
          Author: ${childProcess.execSync("echo 최동호")}
      `,
    }),
    // DefinePlugin: process.env.NODE_ENV 변수를 포함하여, 전역 상수 문자열을 웹팩 컴파일 시점에 정의
    // ** JSON.stringify 함수로 감싸야 문자열로 정의됨
    new webpack.DefinePlugin({
      project: JSON.stringify("TerritoryCard"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV !== "development"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV !== "development"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "./node_modules/axios/dist/axios.min.js",
    //       to: "./axios.min.js",
    //     },
    //   ],
    // }),
  ],
};