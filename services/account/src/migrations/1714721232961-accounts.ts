import { MigrationInterface, QueryRunner } from 'typeorm';

export class Accounts1714721232961 implements MigrationInterface {
  name = 'Accounts1714721232961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "UQ_c57d6a982eeaa1d115687b17b63" UNIQUE ("accountNumber")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_c57d6a982eeaa1d115687b17b63"`,
    );
  }
}
