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

export enum ExportStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Overdue = 'Overdue',
  Draft = 'Draft',
}

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

  // Thêm trường status với enum
  @Column({
    type: 'enum',
    enum: ExportStatus,
    default: ExportStatus.Pending,
  })
  status: ExportStatus;

  @Column({ nullable: true })
  code: string;

  @OneToMany(
    () => ExportDetailWarehouse,
    (exportDetailWarehouse) => exportDetailWarehouse.exportID,
  )
  exportDetailID: ExportDetailWarehouse[];
}
