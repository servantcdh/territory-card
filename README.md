<p align="center">
  <a href="https://www.jwterritory.co.kr/" target="blank"><img src="https://github.com/servantcdh/territory-card/blob/main/src/assets/images/loading.gif?raw=true" width="200" alt="하늘수레버전 로딩화면" /></a>
</p>

## TerritoryCard - 구역 카드 시스템

TerritoryCard는 성경 마태복음 28:19, 20의 그리스도의 명령과 1세기 그리스도인들의 본을 따르기 위해 노력하는 사람들을 위해 만든 봉사 구역 카드 관리 시스템입니다.

본 저장소는 TerriotoryCard의 FE 프로젝트를 관리하는 공간입니다.

(TerritoryCard의 BE 프로젝트 저장소를 방문하시려면 [여기](https://github.com/servantcdh/territory-card-api)를 클릭하세요.)

## 프로젝트 목표

1. 직관적
2. 단순함
3. 최소화

- 요소의 최소화: 종이 구역카드 같은 직관적 인터페이스 구현

- 기능의 최소화: 구역 카드 시스템이라는 본질에 충실한 구현

- 설계의 최소화: 오로지 카드가 기준이 되는 구조로 유지 보수와 사용성을 모두 만족시킴

php에서 react + nestjs로 새롭게 개발하여 생산성과 성능을 향상시킴

## README.md를 이렇게 활용하려고 합니다.

1. TerritoryCard의 제작 과정을 기록합니다.
2. 단기 목표를 설정하고 구현하는데 사용한 라이브러리나 레퍼런스를 함께 기록합니다.
3. 특별히 인상적이었던 점이 있다면 또한 기록합니다.

## 이번 목표

- 렌더링 최적화

## 사용한 라이브러리

| name                         | version    | explain                                                                                                        |
| ---------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| webpack                      | _^5.75.0_  | 여러 형식의 파일을 js 모듈로 불러와 번들링하는 라이브러리                                                      |
| webpack-cli                  | _^5.0.1_   | 웹팩 커맨드라인 설치                                                                                           |
| webpack-dev-server           | _^4.11.1_  | 웹팩 개발 서버 설치                                                                                            |
| css-loader                   | _^6.7.3_   | css를 모듈로 변환해 불러오는 로더                                                                              |
| style-loader                 | _^3.3.1_   | js로 변경된 스타일을 동적으로 dom에 추가하는 로더                                                              |
| html-webpack-plugin          | _^5.5.0_   | HTML 후처리 플러그인, 웹팩 번들을 HTML에 주입, 빈칸/주석 제거, ejs 문법으로 작성된 부분을 전달받은 값으로 치환 |
| clean-webpack-plugin         | _^4.0.0_   | 웹팩 빌드 이전 결과물을 제거하는 플러그인                                                                      |
| mini-css-extract-plugin      | _^2.7.2_   | css파일을 번들에서 별도 파일로 분리하는 플러그인                                                               |
| copy-webpack-plugin          | _^11.0.0_  | 지정한 파일을 복사해 output 경로에 넣어주는 플러그인                                                           |
| css-minimizer-webpack-plugin | _^4.2.2_   | css파일의 빈칸을 없애주는 플러그인 (optimize-css-assets-webpack-plugin를 대체)                                 |
| terser-webpack-plugin        | _^5.3.6_   | js코드를 난독화하고 디버거 구문과 console.log를 제거해주는 플러그인                                            |
| @babel/core                  | _^7.20.7_  | 불러온 파일을 AST로 파싱하여 출력해주는 라이브러리 (변환은 바벨 플러그인에서 이루어짐)                         |
| @babel/cli                   | _^7.20.7_  | 바벨 커맨드라인 설치                                                                                           |
| @babel/preset-env            | _^7.20.2_  | ECMAScript2015+ js코드로 변환할 때 필요한 바벨 플러그인 프리셋                                                 |
| babel-loader                 | _^9.1.0_   | 바벨을 웹팩에 통합하는 로더                                                                                    |
| core-js                      | _^3.27.1_  | 구형 브라우저가 이해할 수 있도록 js코드를 변환시켜주는 폴리필 패키지                                           |
| @babel/preset-react          | _^7.18.6_  | react 문법을 브라우저가 이해할 수 있도록 변환시켜주는 폴리필 패키지                                            |
| react                        | _^18.2.0_  | react 라이브러리 설치                                                                                          |
| react-dom                    | _^18.2.0_  | react가 생성한 가상 DOM을 실제 HTML에 연결                                                                     |
| tailwindcss                  | _^3.2.4_   | tailwindcss 설치                                                                                               |
| postcss                      | _^8.4.20_  | css 후처리, css 작성을 더 편하게 만들어주는 플러그인                                                           |
| autoprefixer                 | _^10.4.13_ | css 권고안에 포함되지 못하거나 제정되지 않은 기능을 사용하도록 벤더 프리픽스를 추가해주는 postcss 플러그인     |
| postcss-loader               | _^7.0.2_   | postcss를 웹팩에 통합하는 로더                                                                                 |
| tailwind-scrollbar-hide      | _^1.1.7_   | tailwindcss 스크롤바 숨김 클래스 추가 플러그인                                                                 |
| react-router-dom             | _^6.6.1_   | url에 따른 페이지 컴포넌트를 지정한 dom에 렌더링시켜주는 라이브러리                                            |
| axios                        | _^1.2.2_   | ajax request 라이브러리                                                                                        |
| dotenv                       | _^16.0.3_  | 환경 변수 파일을 읽어오는 라이브러리                                                                           |
| @tanstack/react-query        | _^4.21.0_  | promise 기반 함수를 더 체계적으로 관리할 수 있는 라이브러리. 덤으로 캐싱도 지원. 후자의 기능으로 더 유명하다.  |
| react-image-crop             | _^10.0.9_  | 이미지 자르기 라이브러리                                                                                       |
| webpack-pwa-manifest         | _^4.3.0_   | 웹팩 후처리 과정 중 PWA Manifest를 생성해주는 플러그인                                                         |
| workbox-webpack-plugin       | _^6.5.4_   | 웹팩 후처리 과정 중 serviceWorker를 생성하고 포함시키는 플러그인                                               |
| firebase                     | _^9.15.0_  | 파이어베이스 SDK                                                                                               |
| twin.macro                   | _^3.3.0_   | tailwind css와 css-in-js 프레임워크를 통합하여 사용할 수 있는 라이브러리                                       |
| babel-plugin-macros          | _^3.1.0_   | 코드 변환을 위한F 별도 플로그인을 설치하지 않아도 되게 만드는 플러그인                                           |

## 특이 사항

1. 렌더링 최적화를 위해 우선 0) 페이지 컴포넌트들을 지연 로딩으로 변경하고, 1) 서드 파티 라이브러리들을 `webpack`의 `externals`로 옮겨서 후처리 대상에서 예외시키고, 2) `CopyWebpackPlugin`으로 `node_modules`안의 라이브러리 소스들을 복사한 다음, 3) `HtmlWebpackPlugin`을 통해 복사된 소스들을 추가해줬다. 이정도만 했더니 [PageSpeed](https://pagespeed.web.dev/)에서 성능이 `38%`에서 `46%`로 상승했다. 유의미한 변화인가.

2. 접근성 향상을 위해서 이미지 태그 프로퍼티에 `alt`를 명시하고, 로고 이미지 파일을 `.png`에서 `.webp`로 수정했다. `84%`에서 `100%`로 상승했다...

3. 성능이 아직 형편없어서 [PageSpeed](https://pagespeed.web.dev/) 보고서를 참조하면서 수정 작업을 해나갈 계획이다.

## 참고한 곳

[브라우저 렌더링 과정과 최적화 - bumsu0211블로그](https://velog.io/@bumsu0211/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95%EA%B3%BC-%EC%B5%9C%EC%A0%81%ED%99%94)

[[React] 리액트 lazy loading 적용하기(lighthouse 성능 최적화) - choijying21블로그](https://choijying21.tistory.com/63)

## 만든이

- Author - [DonghoChoi](https://github.com/servantcdh)
- github - [servantcdh](https://github.com/servantcdh)
- Email - [servantcdh@naver.com](servantcdh@naver.com)
