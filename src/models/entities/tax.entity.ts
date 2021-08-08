import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tax', { schema: 'db_test' })
export class Tax {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    comment: 'Nombre del impuesto',
    length: 100
  })
  name: string;

  @Column({
    type: 'float',
    name: 'value',
    comment: 'Valor del impuesto'
  })
  value: number;

  @Column({
    type: 'boolean',
    name: 'enabled',
    nullable: false,
    default: true,
    comment: 'Flag de impuesto habilitado'
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
}
