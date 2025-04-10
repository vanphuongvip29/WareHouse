import { ExportWarehouse } from 'src/exportwarehouse/entities/exportwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ExportDetailWarehouse {
  @PrimaryGeneratedColumn()
  exportDetailID: number;

  @ManyToOne(
    () => ExportWarehouse,
    (exportWarehouse) => exportWarehouse.exportDetailID,
  )
  @JoinColumn({ name: 'exportID' })
  exportID: ExportWarehouse;

  @ManyToOne(() => Product, (product) => product.exportDetailID)
  @JoinColumn({ name: 'productID' })
  productID: Product;

  @Column()
  quantity: number;

  @Column()
  salePrice: number;
}
