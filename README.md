## TerritoryCard - 구역 카드 시스템

TerritoryCard는 성경 마태복음 28:19, 20의 그리스도의 명령과 1세기 그리스도인들의 본을 따르기 위해 노력하는 사람들을 위해 만든 봉사 구역 카드 관리 시스템입니다.

본 저장소는 TerriotoryCard의 FE 프로젝트를 관리하는 공간입니다.

(TerritoryCard의 BE 프로젝트 저장소를 방문하시려면 [여기](https://github.com/servantcdh/territory-card-api)를 클릭하세요.)

## README.md를 이렇게 활용하려고 합니다.

1. TerritoryCard의 제작 과정을 기록합니다.
2. 단기 목표를 설정하고 구현하는데 사용한 라이브러리나 레퍼런스를 함께 기록합니다.
3. 특별히 인상적이었던 점이 있다면 또한 기록합니다.

## 이번 목표

- `babel` 을 설치한다.
- `babel` 을 `webpack` 에 연동한다.

## 사용한 라이브러리

| name                         | version   | explain                                                                                                        |
| ---------------------------- | --------- | -------------------------------------------------------------------------------------------------------------- |
| webpack                      | _^5.75.0_ | 여러 형식의 파일을 js 모듈로 불러와 번들링하는 라이브러리                                                      |
| webpack-cli                  | _^5.0.1_  | 웹팩 커맨드라인 설치                                                                                           |
| webpack-dev-server           | _^4.11.1_ | 웹팩 개발 서버 설치                                                                                            |
| css-loader                   | _^6.7.3_  | css를 모듈로 변환해 불러오는 로더                                                                              |
| style-loader                 | _^3.3.1_  | js로 변경된 스타일을 동적으로 dom에 추가하는 로더                                                              |
| html-webpack-plugin          | _^5.5.0_  | HTML 후처리 플러그인, 웹팩 번들을 HTML에 주입, 빈칸/주석 제거, ejs 문법으로 작성된 부분을 전달받은 값으로 치환 |
| clean-webpack-plugin         | _^4.0.0_  | 웹팩 빌드 이전 결과물을 제거하는 플러그인                                                                      |
| mini-css-extract-plugin      | _^2.7.2_  | css파일을 번들에서 별도 파일로 분리하는 플러그인                                                               |
| copy-webpack-plugin          | _^11.0.0_ | 지정한 파일을 복사해 output 폴더에 넣어주는 플러그인                                                           |
| css-minimizer-webpack-plugin | _^4.2.2_  | css파일의 빈칸을 없애주는 플러그인 (webpack4의 optimize-css-assets-webpack-plugin를 대체)                      |
| terser-webpack-plugin        | _^5.3.6_  | js코드를 난독화하고 디버거 구문과 console.log를 제거해주는 플러그인                                            |

## 특이 사항

1. 김정환 님의 블로그는 `webpack 4` 환경을 기준으로 정리가 되어있었기 때문에 `5`버전에 대한 추가적인 조사가 필요했다.  
   `webpack` 공식홈의 레퍼런스를 보니 몇 가지 `loader`들이 `5`에서 통합되어 별도로 설치 필요없이 사용할 수 있음을 알게 됐다.

2. 그동안 현업에서는 gitlab의 private 저장소를 이용해왔다가 이번 프로젝트부터는 github을 사용하고 있다.  
   지난 커밋부터 GPG key 서명을 적용해보고 있는데 집과 회사의 mac과 vscode에 GPG 환경을 세팅하던 중 `$ error: gpg failed to sign the data >> fatal: failed to write commit object` 에러로 고생을 했다.

   `$ echo "test" | gpg --clearsign`로 터미널에서 직접 gpg 서명을 사용해보면 원인을 알려준다.

   ```bash
   -----BEGIN PGP SIGNED MESSAGE-----
   Hash: SHA256
   
   test
   gpg: signing failed: No pinentry
    gpg: [stdin]: clear-sign failed: No pinentry
   ```

   `pinentry`라는 프로그램이 없어서였던게 원인이었다. 사실 설치는 되어있지만 mac에서는 `pinentry-mac`이라는 별도의 프로그램을 설치해야한다.

   `$ brew install pinentry-mac`

   그 다음 `gpg` 환경에 `pinentry-mac` 경로를 추가해야 한다.

   `$ echo "pinentry-program /opt/homebrew/bin/pinentry-mac" >> ~/.gnupg/gpg-agent.conf`

   마지막으로 `gpg`를 재시작해주면 모든 변경 사항이 적용된다.

   `$ gpgconf --kill gpg-agent`

## 참고한 곳

[프론트엔드 개발환경의 이해: 김정환블로그](https://jeonghwan-kim.github.io/series/2019/12/22/frontend-dev-env-babel.html)

[How to fix ‘GPG failed to sign the data’ error?: Candid.Tech](https://candid.technology/error-gpg-failed-to-sign-the-data/)

## 만든이

- Author - [DonghoChoi](https://github.com/servantcdh)
- github - [servantcdh](https://github.com/servantcdh)
- Email - [servantcdh@naver.com](servantcdh@naver.com)
