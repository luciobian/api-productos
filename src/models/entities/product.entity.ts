import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Tax } from './tax.entity';

@Entity('product', { schema: 'db_test' })
export class Product {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    comment: 'Nombre del producto',
    length: 100
  })
  name: string;

  @Column({
    type: 'varchar',
    name: 'description',
    nullable: true,
    default: null,
    comment: 'Descripción del producto',
    length: 255
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    name: 'price',
    nullable: false,
    comment: 'Precio del producto'
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 8,
    scale: 2,
    name: 'total_price',
    nullable: false,
    comment: 'Precio del producto con impuesto'
  })
  totalPrice: number;

  @Column({
    type: 'int',
    name: 'tax_id',
    nullable: false,
    comment: 'Clave foranea tabla tax'
  })
  taxId: number;

  @ManyToOne(() => Tax, (tax) => tax.id)
  @JoinColumn([{ name: 'tax_id', referencedColumnName: 'id' }])
  tax: Tax;

  @Column({
    type: 'boolean',
    name: 'enabled',
    nullable: false,
    default: true,
    comment: 'Flag de producto habilitado'
  })
  enabled: boolean;

  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
    nullable: false,
    comment: 'Fecha de creación'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
    nullable: true,
    comment: 'Fecha de actualización'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'datetime',
    name: 'deleted_at',
    nullable: true,
    comment: 'Fecha de baja lógica'
  })
  deletedAt: Date;
}
