import { MigrationInterface, QueryRunner } from 'typeorm'

export class Cascade1717939784103 implements MigrationInterface {
  name = 'Cascade1717939784103'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_attendee" DROP CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9"`
    )
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_e4abcb418e46db776e920a05a16"`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "event_owner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
      `ALTER TABLE "event" ADD CONSTRAINT "FK_e4abcb418e46db776e920a05a16" FOREIGN KEY ("ownerId") REFERENCES "event_owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "event_attendee" ADD CONSTRAINT "FK_16b4a29e47abe22b1e3c851bcc9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
