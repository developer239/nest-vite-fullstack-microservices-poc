import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1717549458809 implements MigrationInterface {
  name = 'Initial1717549458809'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event-attendee" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "eventId" integer, CONSTRAINT "PK_19bee288e248c2cbcc96b9733c6" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "event-attendee" ADD CONSTRAINT "FK_d6722777354a9ef5c156767cab1" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event-attendee" DROP CONSTRAINT "FK_d6722777354a9ef5c156767cab1"`
    )
    await queryRunner.query(`DROP TABLE "event"`)
    await queryRunner.query(`DROP TABLE "event-attendee"`)
  }
}
