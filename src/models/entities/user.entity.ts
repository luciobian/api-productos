import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';

@Entity('user', { schema: 'db_test' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: 'Email de un usuario',
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Contraseña usuario',
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Token de autenticación',
    nullable: false
  })
  token: string;

  @Column({
    type: 'int',
    name: 'role_id',
    nullable: false,
    comment: 'Clave foranea tabla role'
  })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;

  @Column({
    type: 'boolean',
    name: 'enabled',
    nullable: false,
    default: true,
    comment: 'Flag de usuario habilitado'
  })
  enabled: boolean;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    nullable: false,
    comment: 'Fecha de creación'
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    nullable: true,
    comment: 'Fecha de actualización'
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
    comment: 'Fecha de baja lógica'
  })
  deleted_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
