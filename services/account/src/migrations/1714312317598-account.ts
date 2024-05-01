import { MigrationInterface, QueryRunner } from "typeorm";

export class Account1714312317598 implements MigrationInterface {
    name = 'Account1714312317598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" character varying NOT NULL, "holderName" character varying NOT NULL, "holderPhone" character varying NOT NULL, "holderAddress" character varying NOT NULL, "holderCountry" character varying NOT NULL, "balance" numeric(10,2) NOT NULL, "version" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "accounts"`);
    }

}
