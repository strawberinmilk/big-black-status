import { MigrationInterface, QueryRunner } from "typeorm";

export class Migtations1738250199727 implements MigrationInterface {
    name = 'Migtations1738250199727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tmpEmail" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."tmpEmail" IS '仮ユーザメールアドレス'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tmpToken" character varying`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."tmpToken" IS '仮ユーザトークン'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "active" integer NOT NULL DEFAULT '-1'`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."active" IS '有効ユーザ'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."active" IS '有効ユーザ'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "active"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."tmpToken" IS '仮ユーザトークン'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tmpToken"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."tmpEmail" IS '仮ユーザメールアドレス'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tmpEmail"`);
    }

}
