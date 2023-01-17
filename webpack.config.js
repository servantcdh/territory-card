const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { GenerateSW } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: mode === "development" ? ".env.dev" : ".env.prod",
});

module.exports = {
  mode,
  // entry: 웹팩이 js를 읽기 시작하는 지점
  entry: {
    main: "./src/index.js",
  },
  // output: 웹팩이 번들을 내보내는 지점
  output: {
    publicPath: "/",
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
  // devtool: 소스맵 생성 여부 (https://joshua1988.github.io/webpack-guide/devtools/source-map.html)
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 4200,
    client: {
      overlay: {
        errors: true,
      },
    },
    proxy: {
      "/api": {
        target: process.env.API_HOST,
        pathRewrite: {
          "/api": "/",
        },
      },
    },
    // hot: Hot Module Replacement 옵션, 변동된 모듈만 리렌더링
    hot: true,
    // historyApiFallback: HTML5 History API Fallback 활성화 여부, 브라우저에서 페이지 요청시 output.publicPath로 리다이렉트 시킴
    historyApiFallback: true,
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
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|svg|ico)$/,
        // type[ asset/resource ]: 위의 정적 파일을 모듈로 사용 (webpack4의 file-loader를 대체)
        type: "asset/resource",
      },
      {
        test: /\.(png|gif|jpe?g|svg|ico)$/,
        // type[ asset > parser > dataUrlCondition > maxSize ]: 정의한 용량보다 작은 이미지들은 dataUrl로 변환 (webpack4의 url-loader/limit를 대체)
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        // loader: 사용할 로더가 1개일 때 쓰는 프로퍼티
        loader: "babel-loader",
        // exclude: 읽어올 대상에서 제외할 파일명 규칙을 정규식으로 정의, test의 반대
        exclude: /node_modules/,
        // resolve: 읽어온 파일의 확장자를 정의하면 import 구문에서 생략 가능
        resolve: {
          extensions: ["", ".js", ".jsx"],
        },
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
    // DefinePlugin: 전역 상수 문자열을 웹팩 컴파일 시점에 정의
    // ** JSON.stringify 함수로 감싸야 문자열로 정의됨
    new webpack.DefinePlugin({
      project: JSON.stringify("TerritoryCard"),
      apiHost: JSON.stringify(
        mode !== "development" ? process.env.API_HOST : ""
      ),
      firebase_apiKey: JSON.stringify(process.env.FIREBASE_API_KEY),
      firebase_authDomain: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      firebase_projectId: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      firebase_storageBucket: JSON.stringify(
        process.env.FIREBASE_STORAGE_BUCKET
      ),
      firebase_messagingSenderId: JSON.stringify(
        process.env.FIREBASE_MESSAGING_SENDER_ID
      ),
      firebase_appId: JSON.stringify(process.env.FIREBASE_APP_ID),
      firebase_measurementId: JSON.stringify(
        process.env.FIREBASE_MEASUREMENT_ID
      ),
      fcm_vapid: JSON.stringify(process.env.FCM_VAPID),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      templateParameters: {
        env: mode === "development" ? "(개발용)" : "",
        kakao_key: process.env.KAKAO_KEY,
      },
      favicon: "./public/favicon.ico",
      minify:
        mode !== "development"
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(mode !== "development"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
          new WebpackPwaManifest({
            name: "JW 구역 카드",
            short_name: "JW 구역 카드",
            description: "구역 카드 시스템",
            background_color: "#ffffff",
            crossOrigin: "use-credentials",
            theme_color: "#facc15",
            display: "standalone",
            icons: [
              {
                src: path.resolve("src/assets/images/Icon.png"),
                sizes: [96, 128, 192, 256, 384, 512],
              },
            ],
          }),
          new GenerateSW({
            include: [/\.html$/, /\.js$/],
          }),
        ]
      : []),
    new CopyPlugin({
      patterns: [
        {
          from: "./public/firebase-messaging-sw.js",
          to: "./firebase-messaging-sw.js",
        },
      ],
    }),
  ],
};
