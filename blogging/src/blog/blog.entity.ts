import { IsOptional } from "class-validator";
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class BlogEntity {
    @ObjectIdColumn()
    _id: string;
  
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    author: string;

    @Column()
    created: string;

    @Column()
    modified: string;
}