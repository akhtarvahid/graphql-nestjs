import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './project/project.entity';
import { ProjectModule } from './project/project.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 7070,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      synchronize: true,
      entities: [ProjectEntity],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/project-schema.gql',
    }),
    ProjectModule,
  ],
})
export class AppModule {}
