import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732359038713 implements MigrationInterface {
    name = 'Migration1732359038713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "close_statuses" ADD "colorCode" character varying NOT NULL DEFAULT '#FF00FF'`);
        await queryRunner.query(`COMMENT ON COLUMN "close_statuses"."colorCode" IS 'グラフ色'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "close_statuses"."colorCode" IS 'グラフ色'`);
        await queryRunner.query(`ALTER TABLE "close_statuses" DROP COLUMN "colorCode"`);
    }

}
