import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1733270564317 implements MigrationInterface {
    name = 'Migrations1733270564317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "close_statuses" ADD "group" character varying NOT NULL DEFAULT 'please_set'`);
        await queryRunner.query(`COMMENT ON COLUMN "close_statuses"."group" IS 'グループ'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "close_statuses"."group" IS 'グループ'`);
        await queryRunner.query(`ALTER TABLE "close_statuses" DROP COLUMN "group"`);
    }

}
