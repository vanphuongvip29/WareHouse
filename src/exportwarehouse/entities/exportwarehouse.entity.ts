import { Customer } from 'src/customers/entities/customer.entity';
import { ExportDetailWarehouse } from 'src/exportdetailwarehouse/entities/exportdetailwarehouse.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ExportWarehouse {
  @PrimaryGeneratedColumn()
  exportID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  exportDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.exportID)
  @JoinColumn({ name: 'customerID' })
  customerID: Customer;

  @Column()
  totalAmount: number;

  @OneToMany(
    () => ExportDetailWarehouse,
    (exportDetailWarehouse) => exportDetailWarehouse.exportID,
  )
  exportDetailID: ExportDetailWarehouse[];
}
