import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730734500101 implements MigrationInterface {
    name = 'Migrations1730734500101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "close_statuses" ("id" SMALLSERIAL NOT NULL, "status" character varying NOT NULL, "statusJpName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e5ae05aa658cf10d40f40ee2d30" UNIQUE ("id"), CONSTRAINT "PK_e5ae05aa658cf10d40f40ee2d30" PRIMARY KEY ("id")); COMMENT ON COLUMN "close_statuses"."id" IS 'クローズステータスID'; COMMENT ON COLUMN "close_statuses"."status" IS 'ステータス英名'; COMMENT ON COLUMN "close_statuses"."statusJpName" IS 'ステータス和名'`);
        await queryRunner.query(`CREATE TABLE "closes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "closeStatusId" smallint NOT NULL, "parkingRoadId" smallint NOT NULL, "userId" smallint NOT NULL, CONSTRAINT "UQ_5a7530927396ffd6681a49ef281" UNIQUE ("id"), CONSTRAINT "PK_5a7530927396ffd6681a49ef281" PRIMARY KEY ("id")); COMMENT ON COLUMN "closes"."closeStatusId" IS 'クローズステータスID'; COMMENT ON COLUMN "closes"."parkingRoadId" IS 'パーキング道路ID'; COMMENT ON COLUMN "closes"."userId" IS 'ユーザID'`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_c5f928363a94110b8f7c7971153" FOREIGN KEY ("closeStatusId") REFERENCES "close_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_f862ab5852e21546209ebc15808" FOREIGN KEY ("parkingRoadId") REFERENCES "parking_roads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "closes" ADD CONSTRAINT "FK_8888ecc96176b40f17fae856f0d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_8888ecc96176b40f17fae856f0d"`);
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_f862ab5852e21546209ebc15808"`);
        await queryRunner.query(`ALTER TABLE "closes" DROP CONSTRAINT "FK_c5f928363a94110b8f7c7971153"`);
        await queryRunner.query(`DROP TABLE "closes"`);
        await queryRunner.query(`DROP TABLE "close_statuses"`);
    }

}
