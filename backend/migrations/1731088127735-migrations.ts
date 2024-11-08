import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731088127735 implements MigrationInterface {
    name = 'Migrations1731088127735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_c5f928363a94110b8f7c7971153"`);
        await queryRunner.query(`ALTER TABLE "close_statuses" ADD CONSTRAINT "UQ_e5ae05aa658cf10d40f40ee2d30" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "UQ_5a7530927396ffd6681a49ef281" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_c5f928363a94110b8f7c7971153" FOREIGN KEY ("closeStatusId") REFERENCES "close_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_c5f928363a94110b8f7c7971153"`);
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "UQ_5a7530927396ffd6681a49ef281"`);
        await queryRunner.query(`ALTER TABLE "close_statuses" DROP CONSTRAINT "UQ_e5ae05aa658cf10d40f40ee2d30"`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_c5f928363a94110b8f7c7971153" FOREIGN KEY ("closeStatusId") REFERENCES "close_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
