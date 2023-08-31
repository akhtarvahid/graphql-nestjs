import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "article" })
export class ArticleEntity {
    @PrimaryGeneratedColumn()
   id: string;


   @Column()
   title: string;
}