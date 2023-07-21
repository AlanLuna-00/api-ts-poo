import { MigrationInterface, QueryRunner } from "typeorm";

export class AllChanges1689696387562 implements MigrationInterface {
    name = 'AllChanges1689696387562'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`purchases_products\` CHANGE \`quantity\` \`quantity_product\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`categort_name\` \`category_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`category_name\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`category_name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`category_name\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`category_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`category_name\` \`categort_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchases_products\` CHANGE \`quantity_product\` \`quantity\` int NOT NULL`);
    }

}
