import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirebaseAuth1717865265300 implements MigrationInterface {
  name = 'FirebaseAuth1717865265300'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "uid" character varying NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_df955cae05f17b2bcf5045cc021" UNIQUE ("uid")`
    )
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2')`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT '1'`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_df955cae05f17b2bcf5045cc02" ON "user" ("uid") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df955cae05f17b2bcf5045cc02"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`)
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`)
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_df955cae05f17b2bcf5045cc021"`
    )
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "uid"`)
  }
}
