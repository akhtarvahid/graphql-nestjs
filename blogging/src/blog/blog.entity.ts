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
}