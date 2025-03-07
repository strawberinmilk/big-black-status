import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationsProd1741258034683 implements MigrationInterface {
  name = 'MigrationsProd1741258034683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "close_statuses" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "statusJpName" character varying NOT NULL, "colorCode" character varying NOT NULL DEFAULT '#FF00FF', "group" character varying NOT NULL DEFAULT 'please_set', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_e5ae05aa658cf10d40f40ee2d30" UNIQUE ("id"), CONSTRAINT "PK_e5ae05aa658cf10d40f40ee2d30" PRIMARY KEY ("id")); COMMENT ON COLUMN "close_statuses"."id" IS 'クローズステータスID'; COMMENT ON COLUMN "close_statuses"."status" IS 'ステータス英名'; COMMENT ON COLUMN "close_statuses"."statusJpName" IS 'ステータス和名'; COMMENT ON COLUMN "close_statuses"."colorCode" IS 'グラフ色'; COMMENT ON COLUMN "close_statuses"."group" IS 'グループ'`,
    );
    await queryRunner.query(
      `CREATE TABLE "closes" ("id" SERIAL NOT NULL, "closeStatusId" integer NOT NULL, "parkingRoadId" integer NOT NULL, "userId" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_5a7530927396ffd6681a49ef281" UNIQUE ("id"), CONSTRAINT "PK_5a7530927396ffd6681a49ef281" PRIMARY KEY ("id")); COMMENT ON COLUMN "closes"."closeStatusId" IS 'クローズステータスID'; COMMENT ON COLUMN "closes"."parkingRoadId" IS 'パーキング道路ID'; COMMENT ON COLUMN "closes"."userId" IS 'ユーザID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "parkings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "radius" smallint NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_70153344e8c552c6e372a5d3dcd" UNIQUE ("name"), CONSTRAINT "UQ_1e0d5ee2dc977278b3c09b004ed" UNIQUE ("latitude"), CONSTRAINT "UQ_3caa76cede98f32cb39ed036bf8" UNIQUE ("longitude"), CONSTRAINT "UQ_ff5851f221bd241a0e959403f9b" UNIQUE ("id"), CONSTRAINT "PK_ff5851f221bd241a0e959403f9b" PRIMARY KEY ("id")); COMMENT ON COLUMN "parkings"."id" IS 'パーキングエリアID'; COMMENT ON COLUMN "parkings"."name" IS 'PA名'; COMMENT ON COLUMN "parkings"."latitude" IS '経度'; COMMENT ON COLUMN "parkings"."longitude" IS '緯度'; COMMENT ON COLUMN "parkings"."radius" IS '半径'`,
    );
    await queryRunner.query(
      `CREATE TABLE "parking_roads" ("id" SERIAL NOT NULL, "parkingId" integer NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f905ddff5cdcc19706615461e8e" UNIQUE ("id"), CONSTRAINT "PK_f905ddff5cdcc19706615461e8e" PRIMARY KEY ("id")); COMMENT ON COLUMN "parking_roads"."id" IS 'パーキング道路ID'; COMMENT ON COLUMN "parking_roads"."name" IS '道路名'; COMMENT ON COLUMN "parking_roads"."parkingId" IS 'パーキングエリアID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "check_ins" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "parkingRoadId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_fac7f27bc829a454ad477c13f62" UNIQUE ("id"), CONSTRAINT "PK_fac7f27bc829a454ad477c13f62" PRIMARY KEY ("id")); COMMENT ON COLUMN "check_ins"."userId" IS 'ユーザID'; COMMENT ON COLUMN "check_ins"."parkingRoadId" IS 'パーキング道路ID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "userId" integer, "message" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id")); COMMENT ON COLUMN "contacts"."id" IS 'ユーザID'; COMMENT ON COLUMN "contacts"."message" IS '問い合わせ内容'; COMMENT ON COLUMN "contacts"."userId" IS 'ユーザID'`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "screenName" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "tmpEmail" character varying, "tmpToken" character varying, "active" integer NOT NULL DEFAULT '-1', "role" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_f5e9e632c36e6d258398ac3ca44" UNIQUE ("screenName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_cc33226150d1f0d6c409977179c" UNIQUE ("id", "screenName", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")); COMMENT ON COLUMN "users"."id" IS 'ユーザID'; COMMENT ON COLUMN "users"."screenName" IS 'スクリーンネーム'; COMMENT ON COLUMN "users"."name" IS '名前'; COMMENT ON COLUMN "users"."email" IS 'メールアドレス'; COMMENT ON COLUMN "users"."password" IS 'パスワード'; COMMENT ON COLUMN "users"."tmpEmail" IS '仮ユーザメールアドレス'; COMMENT ON COLUMN "users"."tmpToken" IS '仮ユーザトークン'; COMMENT ON COLUMN "users"."active" IS '有効ユーザ'`,
    );
    await queryRunner.query(
      `ALTER TABLE "closes" ADD CONSTRAINT "FK_c5f928363a94110b8f7c7971153" FOREIGN KEY ("closeStatusId") REFERENCES "close_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "closes" ADD CONSTRAINT "FK_f862ab5852e21546209ebc15808" FOREIGN KEY ("parkingRoadId") REFERENCES "parking_roads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "closes" ADD CONSTRAINT "FK_8888ecc96176b40f17fae856f0d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_roads" ADD CONSTRAINT "FK_f720bd2e21496a35edf31ab18a8" FOREIGN KEY ("parkingId") REFERENCES "parkings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "check_ins" ADD CONSTRAINT "FK_068598d393a3d4eb0b776d08a91" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "check_ins" ADD CONSTRAINT "FK_c15fc7ca821e8f342f08847de91" FOREIGN KEY ("parkingRoadId") REFERENCES "parking_roads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "check_ins" DROP CONSTRAINT "FK_c15fc7ca821e8f342f08847de91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "check_ins" DROP CONSTRAINT "FK_068598d393a3d4eb0b776d08a91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "parking_roads" DROP CONSTRAINT "FK_f720bd2e21496a35edf31ab18a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "closes" DROP CONSTRAINT "FK_8888ecc96176b40f17fae856f0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "closes" DROP CONSTRAINT "FK_f862ab5852e21546209ebc15808"`,
    );
    await queryRunner.query(
      `ALTER TABLE "closes" DROP CONSTRAINT "FK_c5f928363a94110b8f7c7971153"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "check_ins"`);
    await queryRunner.query(`DROP TABLE "parking_roads"`);
    await queryRunner.query(`DROP TABLE "parkings"`);
    await queryRunner.query(`DROP TABLE "closes"`);
    await queryRunner.query(`DROP TABLE "close_statuses"`);
  }
}
