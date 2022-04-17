Used - nestjs, graphql, postgres, docker

* Step 1- Create project using 
  | nest new project_name

* Step 2- Do some cleanup like remove files
   controller, services, spec files,
   update app.module.ts

* Step 3-create project module 
  | nest g module project_module_name
  Adding database by installing some dependencies
  | npm i @nestjs/graphql graphql@^15 apollo-server-express
  | npm install --save @nestjs/typeorm typeorm pg

*Step 4-create entity and graphql field
      To add validation, install
    | npm i --save class-validator class-transformer

*Step 5-configure app module and project module
   typeorm module feature in project.module.ts
   typeorm module root in app.module.ts

*Step 6-Create and run docker server to connect postgres
    and add this configuration in app.module
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 7070,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      synchronize: true,
      entities: [ProjectEntity], //add project entity here
    })

*Step 7-Now create server in postgress with above configuration
    
    Screen 1-
    ${/Users/vahidakhtar/Documents/Screenshots/Screenshot 2022-01-08 at 3.17.23 PM.png}
    
    Screen 2-
    
    Screen 3 -

*Step 8-To enable graphq playground
    GraphQLModule.forRoot({ 
      //autoSchemaFile: true, 
      // or
      autoSchemaFile: 'src/project-schema.gql',
    }),    

*Step 9-Now start creating query and mutation.
     install uuid to generate unique id.
     | npm install uuid

