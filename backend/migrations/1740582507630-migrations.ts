import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1740582507630 implements MigrationInterface {
    name = 'Migrations1740582507630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_8888ecc96176b40f17fae856f0d"`);
        await queryRunner.query(`ALTER TABLE "closes" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_8888ecc96176b40f17fae856f0d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_8888ecc96176b40f17fae856f0d"`);
        await queryRunner.query(`ALTER TABLE "closes" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_8888ecc96176b40f17fae856f0d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
