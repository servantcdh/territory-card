## TerritoryCard - 구역 카드 시스템

TerritoryCard는 성경 마태복음 28:19, 20의 그리스도의 명령과 1세기 그리스도인들의 본을 따르기 위해 노력하는 사람들을 위해 만든 봉사 구역 카드 관리 시스템입니다.

본 저장소는 TerriotoryCard의 FE 프로젝트를 관리하는 공간입니다.

(TerritoryCard의 BE 프로젝트 저장소를 방문하시려면 [여기](https://github.com/servantcdh/territory-card-api)를 클릭하세요.)

## README.md를 이렇게 활용하려고 합니다.

1. TerritoryCard의 제작 과정을 기록합니다.
2. 단기 목표를 설정하고 구현하는데 사용한 라이브러리나 레퍼런스를 함께 기록합니다.
3. 특별히 인상적이었던 점이 있다면 또한 기록합니다.

## 이번 목표

- `axios`를 설치한다.
- `react-query`를 설치한다.
- 로그인 페이지를 구현한다.
- 로그인 기능을 구현한다.

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
| react-query                  | _^3.39.2_  | ajax 통신을 더 체계적으로 관리할 수 있는 라이브러리. 서버 상태 관리는 덤이지만 후자의 기능으로 더 유명하다.    |
| dotenv                       | _^16.0.3_  | 환경 변수 파일을 읽어오는 라이브러리                                                                           |

## 특이 사항

1. 이번 목표부터 드디어 `data-fetching` 개념에 들어선다. `Insomnia`랑만 놀던 `Nestjs REST API`가 드뎌 제 짝을 만날 예정이다.

2. 상태 관리 라이브러리로 `react-query`를 사용할 것이다. 이유는 여러 사람이 하나의 구역 카드를 바라보고 실시간으로 정보를 주고받아야 하는 서비스를 구축할 것이기 때문이다. `SWR` 라이브러리를 사용하지 않는 이유는 딱히 없다. `api call signature`도 유사하고 `SWR`을 적용하더라도 크게 상관은 없을거같은데 `react-query`가 더 끌릴 뿐이다.

3. 전역 상태 관리 라이브러리는 필요하다면 `redux-toolkit`으로 구현할 생각이지만 아마도 `react-query`로 충분하지 않을까 예상한다. 전역 상태로 사용될만한 데이터가 사용자 정보와 구역 카드 정보밖에 없기 때문이다. 아담한 프로젝트이다.

4. `ajax`라이브러리로 `fetch`를 쓸 지, `axios`를 쓸 지 고민하다가 후자를 선택했다. `request`라이브러리의 갑작스런 지원 중단으로 당황했던 경험이 있어서 `fetch`를 써왔는데 이번엔 `axios`를 한번 써볼까 한다. 이유는 `webpack externals` 옵션을 많이 활용해보기 위함이다.

5. 환경 변수도 관리할 필요가 생겼다. `.env.dev`, `.env.prod`로 api 끝점을 각각 작성해두려고 한다.

## 참고한 곳

[React Query (useQuery): rlawogks2468블로그](https://velog.io/@rlawogks2468/React-Query)

[My구독의 React Query 전환기: hugo.0 Kakao Tech](https://tech.kakao.com/2022/06/13/react-query/)

[react-query: kyounghwan01블로그](https://kyounghwan01.github.io/blog/React/react-query/basic/)

## 만든이

- Author - [DonghoChoi](https://github.com/servantcdh)
- github - [servantcdh](https://github.com/servantcdh)
- Email - [servantcdh@naver.com](servantcdh@naver.com)
