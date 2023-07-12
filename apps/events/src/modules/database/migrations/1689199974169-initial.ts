import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1689199974169 implements MigrationInterface {
  name = 'Initial1689199974169'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attendee" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, CONSTRAINT "UQ_a53717c5719b2eb8910e32a0853" UNIQUE ("userId"), CONSTRAINT "PK_070338c19378315cb793abac656" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "ownerUserId" integer NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "capacity" integer NOT NULL, "startsAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event_attendees_attendee" ("eventId" integer NOT NULL, "attendeeId" integer NOT NULL, CONSTRAINT "PK_758195d6c8fdafc93ed92d68125" PRIMARY KEY ("eventId", "attendeeId"))`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_04f9e4d07b60a6707bb5c97e13" ON "event_attendees_attendee" ("eventId") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_5ce25e87563a30818c12de4d4f" ON "event_attendees_attendee" ("attendeeId") `
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendees_attendee" ADD CONSTRAINT "FK_04f9e4d07b60a6707bb5c97e138" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendees_attendee" ADD CONSTRAINT "FK_5ce25e87563a30818c12de4d4fd" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_attendees_attendee" DROP CONSTRAINT "FK_5ce25e87563a30818c12de4d4fd"`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendees_attendee" DROP CONSTRAINT "FK_04f9e4d07b60a6707bb5c97e138"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ce25e87563a30818c12de4d4f"`
    )
    await queryRunner.query(
      `DROP INDEX "public"."IDX_04f9e4d07b60a6707bb5c97e13"`
    )
    await queryRunner.query(`DROP TABLE "event_attendees_attendee"`)
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(`DROP TABLE "attendee"`)
  }
}
