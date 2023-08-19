import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsernameInUser1692455414465 implements MigrationInterface {
    name = 'AddUsernameInUser1692455414465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
    }

}
