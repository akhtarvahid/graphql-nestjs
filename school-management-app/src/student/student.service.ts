import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async create(name: string): Promise<StudentEntity> {
    const student = this.studentRepository.create({
      id: uuid(),
      name,
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
    // const result = [];
    // for (let i = 0; i < studentIds?.length - 1; i++) {
    //   result.push(
    //     await this.studentRepository.findOneBy({ id: studentIds[i] }),
    //   );
    // }
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
