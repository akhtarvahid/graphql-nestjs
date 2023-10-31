import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDB1698127833122 implements MigrationInterface {
    name = 'SeedDB1698127833122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tags (name) VALUES ('Front-end'), ('Ui'), ('ReactDev')`);

        await queryRunner.query(
            `INSERT INTO users (email, username, bio, image, password) VALUES ('Akhtar@63@gmail.com', 'Akhtar@63', 'bio from Seeding', '', '$2b$10$spAxB.UE/1F6.N65DrueVeTbaGgzsoss05UlAn26jb0eGgT9tXuJO')`
        );
        
        await queryRunner.query(
            `INSERT INTO article (slug, title, description, body, "tagList", "authorId") VALUES ('slug-1', 'slug-title', 'slug description', 'slug body', 'ui,react', 1), ('slug-2', 'slug-title-2', 'slug description 2', 'slug body 2', 'ui,js', 1)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
