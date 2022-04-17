import { Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProjectInput, Project } from './project.graphql';
import { ProjectService } from './project.service';

Resolver(() => Project);
export class ProjectResolver {
  private logger = new Logger('ProjectResolver');

  @Inject() projectService: ProjectService;

  @Query(() => [Project])
  getProjects() {
    return this.projectService.getProjects();
  }

  @Mutation(() => Project)
  createProject(@Args('create') createProjectInput: CreateProjectInput) {
    try {
      return this.projectService.createProject(createProjectInput);
    } catch(error) {
      this.logger.error(`Something went wrong, Response received: ${JSON.stringify(createProjectInput)}`)
      throw new InternalServerErrorException();
   }
  }
}
