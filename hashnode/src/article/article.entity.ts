import { UserEntity } from "@app/user/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "article" })
export class ArticleEntity {
   @PrimaryGeneratedColumn()
   id: string;

   @Column()
   slug: string;

   @Column()
   title: string;

   @Column({ default: '' })
   description: string;

   @Column({ default: '' })
   body: string;

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;

   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   modifiedAt: Date;

   @Column('simple-array')
   tagList: string[];

   @Column({ default: 0 })
   favoritesCount: number;

   @BeforeUpdate()
   updateTimestamp() {
    this.modifiedAt = new Date();
   }

   @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
   author: UserEntity;
}