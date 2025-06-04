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

  @ManyToOne(() => Supplier, (supplier) => supplier.importwarehouseID)
  @JoinColumn({ name: 'supplierID' })
  supplierID: Supplier;

  @Column()
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  importDate: Date;

  @OneToMany(
    () => Importdetailwarehosue,
    (importDetailWarehosue) => importDetailWarehosue.importID,
    { cascade: true, onDelete: 'CASCADE' },
  )
  importDetailWarehosueID: Importdetailwarehosue[];
}
