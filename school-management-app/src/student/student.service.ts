import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.graphql';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async create(createStudentInput: CreateStudentInput): Promise<StudentEntity> {
    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput
    });

    return this.studentRepository.save(student);
  }

  async students(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  async student(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOne({ id });
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
