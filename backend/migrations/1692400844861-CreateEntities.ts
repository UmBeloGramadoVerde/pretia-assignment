import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1692400844861 implements MigrationInterface {
    name = 'CreateEntities1692400844861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying NOT NULL, "username" character varying(200) NOT NULL, "roles" text NOT NULL, "isAccountDisabled" boolean NOT NULL, "email" character varying(200) NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "username" UNIQUE ("username"), CONSTRAINT "email" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "path" character varying NOT NULL, "size" integer NOT NULL, "contentType" character varying NOT NULL, "articleId" integer, CONSTRAINT "REL_cc8483a84c19a0c736621de049" UNIQUE ("articleId"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "textContent" character varying NOT NULL, "jsonContent" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "imageContentId" integer, "authorId" integer, CONSTRAINT "REL_f6f37915f224891c9ff66e324d" UNIQUE ("imageContentId"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_cc8483a84c19a0c736621de0497" FOREIGN KEY ("articleId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_f6f37915f224891c9ff66e324d2" FOREIGN KEY ("imageContentId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c5a322ad12a7bf95460c958e80e"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_f6f37915f224891c9ff66e324d2"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_cc8483a84c19a0c736621de0497"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
