import { MigrationInterface, QueryRunner } from 'typeorm'

export class PaymentConstraint1689684411334 implements MigrationInterface {
  name = 'PaymentConstraint1689684411334'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "UQ_5474c1ce35a541a72206eb68a7e" UNIQUE ("entityId", "entityType", "userId")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "UQ_5474c1ce35a541a72206eb68a7e"`
    )
  }
}
