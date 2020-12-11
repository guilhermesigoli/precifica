import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRelationsMigration1607642537673
  implements MigrationInterface {
  name = 'AddUserRelationsMigration1607642537673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ADD "userId" bigint`);
    await queryRunner.query(`ALTER TABLE "product" ADD "userId" bigint`);
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
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
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
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userId"`);
  }
}
