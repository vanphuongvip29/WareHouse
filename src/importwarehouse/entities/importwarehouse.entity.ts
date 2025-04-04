import { Importdetailwarehosue } from 'src/importdetailwarehosue/entities/importdetailwarehosue.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Importwarehouse {
  @PrimaryGeneratedColumn()
  importID: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.importwarehouse)
  @JoinColumn({ name: 'supplierID' })
  supplierID: Supplier;

  @Column()
  totalAmount: number;

  @Column()
  importDate: string;

  @OneToMany(
    () => Importdetailwarehosue,
    (importDetailWarehosue) => importDetailWarehosue.importID,
  )
  importDetailWarehosue: Importdetailwarehosue[];
}
