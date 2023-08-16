import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @ObjectIdColumn()
    id: string;

    @Column({ unique: true })
    username: string;
    
    @Column()
    password: string;
}