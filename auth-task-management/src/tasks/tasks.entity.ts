import { Column, Entity, PrimaryColumn } from "typeorm";
import { TaskStatus } from "./tasks.graphql";

@Entity()
export class TasksEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.OPEN
    })
    status: TaskStatus;
}