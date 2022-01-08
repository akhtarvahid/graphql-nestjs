import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  id: string;

  @Column()
  project_title: string;

  @Column()
  project_location: string;
}
