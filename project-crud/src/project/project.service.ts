import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { CreateProjectInput } from './project.graphql';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}
  async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepository.find();
  }
  async createProject(
    createProjectInput: CreateProjectInput,
  ): Promise<ProjectEntity> {
    const project = this.projectRepository.create({
      id: uuid(),
      ...createProjectInput,
    });

    return this.projectRepository.save(project);
  }
}
