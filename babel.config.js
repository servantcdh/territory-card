module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // 폴리필(polyfill) 설정 옵션
        // targets: 브라우저에 따른 코드 변환
        targets: {
          chrome: "79",
          ie: "11"
        },
        // useBuiltIns: 폴리필 패키지를 사용할지 여부 옵션 usage | entry | false
        useBuiltIns: "usage",
        // 폴리필 패키지 지정
        corejs: {
          version: 3,
        },
      },
    ],
  ],
};
