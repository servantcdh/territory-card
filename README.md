## TerritoryCard - 구역 카드 시스템

TerritoryCard는 성경 마태복음 28:19, 20의 그리스도의 명령과 1세기 그리스도인들의 본을 따르기 위해 노력하는 사람들을 위해 만든 봉사 구역 카드 관리 시스템입니다.

본 저장소는 TerriotoryCard의 FE 프로젝트를 관리하는 공간입니다.

(TerritoryCard의 BE 프로젝트 저장소를 방문하시려면 [여기](https://github.com/servantcdh/territory-card-api)를 클릭하세요.)

## README.md를 이렇게 활용하려고 합니다.

1. TerritoryCard의 제작 과정을 기록합니다.
2. 단기 목표를 설정하고 구현하는데 사용한 라이브러리나 레퍼런스를 함께 기록합니다.
3. 특별히 인상적이었던 점이 있다면 또한 기록합니다.

## 이번 목표

- ViewPage 및 다른 페이지 컴포넌트들에 `Suspense`와 `ErrorBoundary`를 구현한다.
- `useQuery custom hook`을 `useQueries`로 수정한다.

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
| react-router-dom             | _^6.6.1_   | url에 따른 페이지 컴포넌트를 지정한 dom에 렌더링시켜주는 라이브러리                                            |
| axios                        | _^1.2.2_   | ajax request 라이브러리                                                                                        |
| dotenv                       | _^16.0.3_  | 환경 변수 파일을 읽어오는 라이브러리                                                                           |
| @tanstack/react-query        | _^4.21.0_  | ajax 통신을 더 체계적으로 관리할 수 있는 라이브러리. 서버 상태 관리는 덤이지만 후자의 기능으로 더 유명하다.    |

## 특이 사항

1. `react-query`에서는 `React Suspense`와 `ErrorBoundary`를 지원해준다. 작성중인 ViewPage에 해당 기능을 구현해서 더 나은 사용자 경험을 제공하려한다.

2. `suspense` 옵션을 활성화할 땐 `useQueries` 사용을 권장한다. `react suspense`가 `data-fetching`에 관여하게 됨에 따라 의도치 않은`component unmount`이 일어나 `network waterfall`이 나타나게 되기 때문이다. `@tanstack/react-query v4.5.0`부터 지원.

## 참고한 곳

[[React] ErrorBoundary 사용하여 에러 핸들링 하기 - rkd028블로그](https://velog.io/@rkd028/React-ErrorBoundary-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81-%ED%95%98%EA%B8%B0)

[suspense를 지원하게 된 useQueries - 단테블로그](https://velog.io/@jay/suspense-useQueries)

## 만든이

- Author - [DonghoChoi](https://github.com/servantcdh)
- github - [servantcdh](https://github.com/servantcdh)
- Email - [servantcdh@naver.com](servantcdh@naver.com)
