import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const found = await this.students();
    if (found && found.some((f) => f.email === createStudentInput.email)) {
      throw new ConflictException('User already exist with this email');
    }

    const student = this.studentRepository.create({
      id: uuid(),
      ...createStudentInput,
    });

    return this.studentRepository.save(student);
  }

  async students(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  async student(id: string): Promise<StudentEntity> {
    const found = await this.studentRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`User doesn't exist with ${id}`);
    }
    return found;
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
