import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1608032990646 implements MigrationInterface {
  name = 'InitialMigration1608032990646';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "input"."total_price" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "input" ALTER COLUMN "total_price" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "order"."total_price" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "total_price" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "order"."inputs_price" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "inputs_price" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."total_price" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "total_price" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."inputs_price" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "inputs_price" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "inputs_price" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."inputs_price" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "total_price" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "product"."total_price" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "inputs_price" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "order"."inputs_price" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "order" ALTER COLUMN "total_price" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "order"."total_price" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "input" ALTER COLUMN "total_price" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "input"."total_price" IS NULL`);
  }
}
