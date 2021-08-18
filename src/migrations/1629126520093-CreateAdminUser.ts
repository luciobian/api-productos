import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminUser1629126520093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO role (id, name, description) VALUES(1, 'admin', 'administrador de la plataforma'); "
    );
    await queryRunner.query(
      //password: secret123
      "INSERT INTO `user` (id, email, token, role_id, password) VALUES(1, 'admin@admin.ts', 'admintoken', 1, '$2b$10$bUQY.qisaZXjXNHKX5lo7.c.dtInfZ7BZpWYJyRx5yYng8JiRTM2q');"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `role` WHERE id=1;');
    await queryRunner.query('DELETE FROM `user` WHERE id=1;');
  }
}
