Used - nestjs, graphql, postgres, docker

* Step 1- Create project using 

  > nest new project_name

* Step 2- Do some cleanup like remove files
   controller, services, spec files,
   update app.module.ts

* Step 3-create project module 

  > nest g module project_module_name

  Adding database by installing some dependencies

  > npm install --save @nestjs/typeorm typeorm pg

* Step 4-create entity and graphql field
      To add validation, install

    > npm i --save class-validator class-transformer

* Step 5-configure app module and project module

   typeorm module feature in project.module.ts
   typeorm module root in app.module.ts

* Step 6-Create and run docker server to connect postgres

   `docker run --name hashnode -e POSTGRES_USER=hashnode -e POSTGRES_PASSWORD=hashnode -p 5430:5432 -d postgres`

    and add this configuration in app.module
    
    ```js
     {
      type: 'postgres',
      host: 'localhost',
      port: 5430,
      username: 'hashnode',
      password: 'hashnode',
      database: 'hashnode',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,   // Make it true while running app for the first time to create default tables. Keep it false 2nd time onwards.
    }
    ```

*Step 7-Now create server in postgres with above configuration
