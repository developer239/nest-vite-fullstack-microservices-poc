import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1689683569958 implements MigrationInterface {
  name = 'Initial1689683569958'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payment_status_enum" AS ENUM('Pending', 'Completed', 'Failed')`
    )
    await queryRunner.query(
      `CREATE TABLE "payment" ("paymentId" SERIAL NOT NULL, "entityId" integer NOT NULL, "entityType" character varying NOT NULL, "userId" integer NOT NULL, "amount" integer NOT NULL, "stripeId" character varying NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'Pending', "isRefunded" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_67ee4523b649947b6a7954dc673" PRIMARY KEY ("paymentId")); COMMENT ON COLUMN "payment"."amount" IS 'Amount in cents'`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment"`)
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`)
  }
}
