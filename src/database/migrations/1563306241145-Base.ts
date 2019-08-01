import {MigrationInterface, QueryRunner} from "typeorm";

export class Base1563306241145 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "keyword" ("id" SERIAL NOT NULL, "trigger" character varying NOT NULL, "response" character varying NOT NULL, CONSTRAINT "PK_affdb8c8fa5b442900cb3aa21dc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "keyword"`);
    }

}
