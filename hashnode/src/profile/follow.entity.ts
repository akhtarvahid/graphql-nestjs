import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: "follows" })
export class FollowEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    followerId: string;

    @Column()
    followingId: string;
}