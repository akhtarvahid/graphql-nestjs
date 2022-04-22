import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './subject/subject.entity';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { StudentEntity } from './student/student.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'graphql-schema.graphql',
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school-db',
      synchronize: true,
      useUnifiedTopology: true,
      port: 27016,
      entities: [SubjectEntity, StudentEntity],
    }),
    SubjectModule,
    StudentModule,
  ],
})
export class AppModule {}
