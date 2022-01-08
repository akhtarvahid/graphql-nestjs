import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProjectInput, Project } from './project.graphql';
import { ProjectService } from './project.service';

Resolver(() => Project);
export class ProjectResolver {
  @Inject() projectService: ProjectService;

  @Query(() => [Project])
  getProjects() {
    return this.projectService.getProjects();
  }

  @Mutation(() => Project)
  createProject(@Args('create') createProjectInput: CreateProjectInput) {
    return this.projectService.createProject(createProjectInput);
  }
}
