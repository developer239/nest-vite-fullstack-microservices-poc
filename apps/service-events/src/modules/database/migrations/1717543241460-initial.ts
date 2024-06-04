import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1717543241460 implements MigrationInterface {
  name = 'Initial1717543241460'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attendee" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_a53717c5719b2eb8910e32a0853" UNIQUE ("userId"), CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event_attendee" ("id" SERIAL NOT NULL, "eventId" integer, "attendeeId" integer, CONSTRAINT "UQ_276a2ab1a71e3db913b6555de8a" UNIQUE ("eventId", "attendeeId"), CONSTRAINT "PK_74780f7235f1576b54f93d3dff3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "ownerUserId" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_1f790cbdb395fced4ebe4f7e406"`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`
    )
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(`DROP TABLE "event_attendee"`)
    await queryRunner.query(`DROP TABLE "attendee"`)
  }
}
