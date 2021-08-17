import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaxes1629127400837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO tax (id, name, value) VALUES(1, 'IVA 4%', 4);");
    await queryRunner.query("INSERT INTO tax (id, name, value) VALUES(2, 'IVA 10%', 10);");
    await queryRunner.query("INSERT INTO tax (id, name, value) VALUES(3, 'IVA 21%', 21);");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM tax WHERE id IN (1, 2, 3);');
  }
}
