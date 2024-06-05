import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1717616002096 implements MigrationInterface {
  name = 'Initial1717616002096'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_attendee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "eventId" uuid, CONSTRAINT "PK_74780f7235f1576b54f93d3dff3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_f440ae2db457bbcf76805a8535" ON "event_attendee" ("userId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_16b4a29e47abe22b1e3c851bcc" ON "event_attendee" ("eventId") `
    )
    await queryRunner.query(
      `CREATE TABLE "event_owner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "PK_36367b592f4185fd34f9a444075" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_ddd923fcf2f5a682a512f2c73f" ON "event_owner" ("userId") `
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "capacity" integer NOT NULL, "startsAt" TIMESTAMP NOT NULL, "ownerId" uuid, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_e4abcb418e46db776e920a05a1" ON "event" ("ownerId") `
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "event_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e4abcb418e46db776e920a05a1"`
    )
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ddd923fcf2f5a682a512f2c73f"`
    )
    await queryRunner.query(`DROP TABLE "event_owner"`)
    await queryRunner.query(
      `DROP INDEX "public"."IDX_16b4a29e47abe22b1e3c851bcc"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f440ae2db457bbcf76805a8535"`
    )
    await queryRunner.query(`DROP TABLE "event_attendee"`)
  }
}
