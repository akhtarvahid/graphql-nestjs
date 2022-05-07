import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TasksEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;
}