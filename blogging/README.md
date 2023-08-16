<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
> Download and install Studio 3T

Create app 

```Js
nest new blogging
```

### Installation 

1. If you don't have nestjs installed, run it

```Js
npm install @nestjs/cli -g
```
2. Install packages

```Js
npm install graphql graphql-tools apollo-server-express @nestjs/graphql @nestjs/apollo
```

3. Create blog(`name of module`) module

```Js 
nest g module blog --no-spec 
```
4. TypeOrm, mongodb, uuid installation and setup

```Js
npm install typeorm @nestjs/typeorm mongodb @types/mongodb uuid
```
5. Additional validation

```Js
npm install class-validator --save
npm install class-transformer
```

### Auth Module Installation 

1. Create auth module

```Js

// to create module
nest g module auth --no-spec

// to create service
nest g service auth --no-spec

// to create resolver
nest g resolver auth --no-spec
```

2. Authentication related dependencies

```Js
npm i jsonwebtoken @nestjs/jwt @nestjs/passport passport-jwt bcrypt

```
3. add below code inside `app.module.ts` -> `GraphQLModule.forRoot<ApolloDriverConfig>({`

```Js
context: ({ req }) => ({ headers: req.headers })
```

## 2. Installation if you cloned application

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Vahid Akhtar](https://in.linkedin.com/akhtarvahid)