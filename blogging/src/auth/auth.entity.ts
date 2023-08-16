import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    username: string;
    
    @Column()
    password: string;
}