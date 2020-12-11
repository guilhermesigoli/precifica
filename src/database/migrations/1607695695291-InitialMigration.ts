import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1607695695291 implements MigrationInterface {
  name = 'InitialMigration1607695695291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "input" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "total_price" numeric(11,2) NOT NULL DEFAULT '0.00', "used_percentage" integer NOT NULL, "product_id" bigint NOT NULL, CONSTRAINT "PK_a1deaa2fcdc821329884ad43931" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP(3) NOT NULL DEFAULT now(), "total_price" numeric(11,2) NOT NULL DEFAULT '0.00', "inputs_price" numeric(11,2) NOT NULL DEFAULT '0.00', "user_id" bigint NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "total_price" numeric(11,2) NOT NULL DEFAULT '0.00', "inputs_price" numeric(11,2) NOT NULL DEFAULT '0.00', "profit_percentage" integer NOT NULL, "user_id" bigint NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_product_order" ("order_id" bigint NOT NULL, "product_id" bigint NOT NULL, CONSTRAINT "PK_84d164f50a1ee5aebd5f2a6ec45" PRIMARY KEY ("order_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_55541f850a81381847cb5665b0" ON "order_product_order" ("order_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0d3ef52c637e9d9b404a3bb12" ON "order_product_order" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "input" ADD CONSTRAINT "FK_a2ac207d29a47308d8dea6973d7" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_3e59a34134d840e83c2010fac9a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_order" ADD CONSTRAINT "FK_55541f850a81381847cb5665b07" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_order" ADD CONSTRAINT "FK_d0d3ef52c637e9d9b404a3bb12d" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_product_order" DROP CONSTRAINT "FK_d0d3ef52c637e9d9b404a3bb12d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_product_order" DROP CONSTRAINT "FK_55541f850a81381847cb5665b07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_3e59a34134d840e83c2010fac9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "input" DROP CONSTRAINT "FK_a2ac207d29a47308d8dea6973d7"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_d0d3ef52c637e9d9b404a3bb12"`);
    await queryRunner.query(`DROP INDEX "IDX_55541f850a81381847cb5665b0"`);
    await queryRunner.query(`DROP TABLE "order_product_order"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "input"`);
  }
}
