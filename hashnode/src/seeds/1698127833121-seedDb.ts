import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDB1698127833122 implements MigrationInterface {
    name = 'SeedDB1698127833122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO tags (name) VALUES ('Front-end'), ('Ui'), ('ReactDev')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
