import {MigrationInterface, QueryRunner} from "typeorm";

export class init1650122535618 implements MigrationInterface {
    name = 'init1650122535618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "postalCode" character varying(5) NOT NULL, "cityCode" character varying(5) NOT NULL, CONSTRAINT "UQ_47412a1f1df4b4d5c1d1b9cf635" UNIQUE ("cityCode"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
