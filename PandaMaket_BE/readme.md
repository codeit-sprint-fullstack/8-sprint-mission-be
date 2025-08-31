
# PandaMarket API

## 실행하기

### 도커를 통하여 실행하기

도커를 사용하면, 환경에 구애받지 않고 어플리케이션을 쉽게 개발 및 실행할 수 있습니다.

해당 장에서는 도커에 대해 자세하게 설명하지 않습니다.
자세한 사항은 [도커 공식문서](https://docs.docker.com/desktop/)를 참조해주세요.


#### 준비물

- npm
- docker
- cocker-compose

#### 실행하는 방법

```shell
npm run compose
```

docker-compose 를 통해 실행했다면, mongodb 은 도커 내부에 자동적으로 만들어집니다.

아래는 자원의 접근 정보입니다.

**DB**

- `PORT` : 27017 (localhost:27017 으로 접근)
- `USER_NAME` : root 
- `USER_PASSWORD` : password

**DB Viewer**

- `PORT` : 8081 (localhost:8081 으로 접근)

**Service**

- `PORT` : 13000 (localhost:13000 으로 접근)


### 로컬 환경에서 실행하기

#### 준비물

- nodejs
- mongodb

#### 실행 전, 필요한 작업

1. `.env` 파일의 `DATABASE_URL` 

MongoDB 접속정보를 환경변수에 반영해야 합니다.
아래 포맷에 맞추어 `DATABASE_URL` 값을 수정해주세요.

```
DATABASE_URL=mongodb://{userName}:{password@{dbHost}:{dbPort}
```

2. DB Seeding (옵션)

```
npm run seed
```

3. 의존성 설치

서비스가 동작하기 위해 필요한 라이브러리를 설치합니다.

```
npm install
```

4. 서비스 실행

```
npm start
```
