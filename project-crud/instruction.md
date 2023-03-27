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
  
  `docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -p 7070:5432 -d postgres`
  
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
    
    Screen 1
   <img width="724" height="300px" alt="Step1" src="https://user-images.githubusercontent.com/16021125/163703391-53cbac9d-1d4a-45dc-a97e-64a5b22ae6a7.png">

    Screen 2
   <img width="501"  height="300px"  alt="Step2" src="https://user-images.githubusercontent.com/16021125/163703403-23c14945-d2a4-4bc7-9d89-2e9fd8d4a1d7.png">

    Screen 3 -
   <img width="502"  height="300px"  alt="Step3" src="https://user-images.githubusercontent.com/16021125/163703417-227af1e6-2cd6-4d36-8b8e-f1fce4f6656f.png">

    Screen 4 -
   <img width="499"  height="300px"  alt="Step4" src="https://user-images.githubusercontent.com/16021125/163703421-ead52a4c-52e2-473f-9fe2-413eb68e33b6.png">

*Step 8-To enable graphq playground
    GraphQLModule.forRoot({ 
      //autoSchemaFile: true, 
      // or
      autoSchemaFile: 'src/project-schema.gql',
    }),    

*Step 9-Now start creating query and mutation.
     install uuid to generate unique id.
     | npm install uuid

