import { ExportWarehouse } from 'src/exportwarehouse/entities/exportwarehouse.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customerID: number;

  @Column()
  customerName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => ExportWarehouse, (exportEntity) => exportEntity.customerID)
  exportID: ExportWarehouse[];
}
