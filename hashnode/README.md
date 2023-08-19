<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

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









<hr />
<hr />
<hr />

- How to create absolute path from relative
    - Configuring absolute path -> requires 2 package(module-alias, nodemon)
        ```Js
        npm install module-alias nodemon
        ```
    - `tsconfig.json`->`compilerOptions`, Add paths inside 
        
            {
              "compilerOptions": {
                ...
                ...
                "paths": {
                  "@app/*": ["./src/*"]
                }
              }
            }
          
           
    - Add `"start": "nodemon"` inside package.json ->  script
    - Create `nodemon.json` and write
       ```Js
          {
              "watch": ["src"],
              "ext": "ts",
              "exec": "IS_TS_NODE=true ts-node -r tsconfig-paths/register src/main.ts"
          }
       ```


- Run postgres with docker commond
```Js
docker run --name hashnode -p 5430:5432 -e POSTGRES_PASSWORD=hashnode -e POSTGRES_USER=hashnode -d postgres
```

- Connect postgres locally db
  - `Server`->`Register`->`Server`
  - General tab -> `Name`='database_name'
  - Connection tab -> `Host name/address` = 'localhost', `port` = port_number(ex.5432), `Maintenance database` = 'database_name', `username` = 'username_of_database', `password` = 'password_of_database'
  - 

- Migrations
  To drop tables
  ```Js
   npm run db:drop
  ```

  To generate tables
  ```Js
   npm run db:migrate
  ```

  To create migration
  ```js
   npm run db:create src/migrations/add_field_name(ex. createUsers)
  ```