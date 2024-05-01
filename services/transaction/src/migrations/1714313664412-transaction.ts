import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transaction1714313664412 implements MigrationInterface {
  name = 'Transaction1714313664412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "note" character varying, "version" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
