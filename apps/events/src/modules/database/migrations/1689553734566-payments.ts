import { MigrationInterface, QueryRunner } from 'typeorm'

export class Payments1689553734566 implements MigrationInterface {
  name = 'Payments1689553734566'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ADD "cost" integer NOT NULL DEFAULT '0'`
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "event"."cost" IS 'Cost in cents'`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "event"."cost" IS 'Cost in cents'`
    )
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "cost"`)
  }
}
