import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesRelationsBetweenArticleAndUser1698127833121 implements MigrationInterface {
    name = 'AddFavoritesRelationsBetweenArticleAndUser1698127833121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "modifiedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "favoritesCount" integer NOT NULL DEFAULT '0', "authorId" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorites_article" ("usersId" integer NOT NULL, "articleId" integer NOT NULL, CONSTRAINT "PK_4019a5dbf3a72da361786c8cfc2" PRIMARY KEY ("usersId", "articleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a1c47e316b5fca0cafbccba848" ON "users_favorites_article" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3bfc382dd3fbe65031c2cf7e6" ON "users_favorites_article" ("articleId") `);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorites_article" ADD CONSTRAINT "FK_a1c47e316b5fca0cafbccba8481" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_article" ADD CONSTRAINT "FK_a3bfc382dd3fbe65031c2cf7e61" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_article" DROP CONSTRAINT "FK_a3bfc382dd3fbe65031c2cf7e61"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_article" DROP CONSTRAINT "FK_a1c47e316b5fca0cafbccba8481"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3bfc382dd3fbe65031c2cf7e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1c47e316b5fca0cafbccba848"`);
        await queryRunner.query(`DROP TABLE "users_favorites_article"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
