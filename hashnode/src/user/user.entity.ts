import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm"
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    username: string

    @Column({ default: '' })
    bio: string

    @Column({ default: '' })
    image: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}