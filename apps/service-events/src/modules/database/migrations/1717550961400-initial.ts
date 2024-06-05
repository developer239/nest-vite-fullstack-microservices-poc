import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1717550961400 implements MigrationInterface {
  name = 'Initial1717550961400'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event_attendee" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "eventId" integer, CONSTRAINT "PK_74780f7235f1576b54f93d3dff3" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`
    )
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(`DROP TABLE "event_attendee"`)
  }
}
