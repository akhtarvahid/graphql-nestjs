import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @ObjectIdColumn()
    id: string;

    @Column({ unique: true })
    username: string;
    
    @Column()
    password: string;
}