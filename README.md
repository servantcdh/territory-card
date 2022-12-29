## TerritoryCard - 구역 카드 시스템

TerritoryCard는 성경 마태복음 28:19, 20의 그리스도의 명령과 1세기 그리스도인들의 본을 따르기 위해 노력하는 사람들을 위해 만든 봉사 구역 카드 관리 시스템입니다.  
본 저장소는 TerriotoryCard의 FE 프로젝트를 관리하는 공간입니다.  
(TerritoryCard의 BE 프로젝트 저장소를 방문하시려면 [여기](https://github.com/servantcdh/territory-card-api)를 클릭하세요.)

## README.md를 이렇게 활용하려고 합니다.

TerritoryCard의 제작 과정을 기록합니다.  
단기 목표를 설정하고 구현하는데 사용한 라이브러리나 레퍼런스를 함께 기록합니다.  
특별히 인상적이었던 점이 있다면 또한 기록합니다.

## 이번 목표

- `npm` 환경을 생성한다.
- `webpack5` 환경을 생성한다.

## 사용한 라이브러리

|name|version|explain|
|---|---|---|
|webpack|*^5.75.0*|웹팩 번들러 설치|
|webpack-cli|*^5.0.1*|웹팩 커맨드라인 인터페이스 설치|
|webpack-dev-server|*^4.11.1*|웹팩 개발 서버 설치|

## 특이 사항

1. 우선, 더이상 미룰 수 없는 일을 시작합니다. 나 자신에게 응원합니다. :+1::+1:

2. ```bash npm i -D webpack webpack-cli webpack-dev-server```을 호기롭게 실행시켰는데 바로 에러가 나왔다.  
`Invalid response body while trying to fetch https://registry.npmjs.org/update-browserslist-db`라는 메세지인데 ```bash npm cache clear --force```로도 해결이 되지 않았다.  
해결방법은 에러 로그 안에 있었는데 ```bash sudo chown -R 501:20 "/Users/{}/.npm"``` 로 파일 권한을 변경하라는 것이었고 이후 정상적으로 `npm`이 실행되었다.

## 참고한 곳

[김정환블로그](https://jeonghwan-kim.github.io/series/2019/12/09/frontend-dev-env-npm.html)

## 만든이

- Author - [DonghoChoi](https://github.com/servantcdh)
- github - [servantcdh](https://github.com/servantcdh)
- Email - [servantcdh@naver.com](servantcdh@naver.com)

