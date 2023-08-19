import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "tags" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}