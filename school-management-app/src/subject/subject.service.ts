import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { v4 as uuid } from 'uuid';
import { CreateSubjectInput } from './subject.graphql';
@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
  ) {}

  async createSubject(createInput: CreateSubjectInput): Promise<SubjectEntity> {
    const { name, startDate, endDate, students } = createInput;
    const subject = this.subjectRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });
    return this.subjectRepository.save(subject);
  }

  async subjects(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
  }

  async subject(id: string): Promise<SubjectEntity> {
    return this.subjectRepository.findOne({ id });
  }

  async assignStudentsToSubject(
    subjectId: string,
    studentsId: string[],
  ): Promise<SubjectEntity> {
    const getSubject = await this.subjectRepository.findOne({
      id: subjectId,
    });
    getSubject.students = [...getSubject.students, ...studentsId];
    return this.subjectRepository.save(getSubject);
  }
}
