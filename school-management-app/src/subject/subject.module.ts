import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { SubjectEntity } from './subject.entity';
import { SubjectResolver } from './subject.resolver';
import { SubjectService } from './subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity]), StudentModule],
  providers: [SubjectResolver, SubjectService],
})
export class SubjectModule {}
