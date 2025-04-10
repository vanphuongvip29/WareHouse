import { Importwarehouse } from 'src/importwarehouse/entities/importwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Importdetailwarehosue {
  @PrimaryGeneratedColumn()
  importDetailID: number;

  @Column()
  quantity: number;

  @Column()
  importPrice: number;

  @ManyToOne(
    () => Importwarehouse,
    (importWarehouse) => importWarehouse.importDetailWarehosueID,
  )
  @JoinColumn({ name: 'importID' })
  importID: Importwarehouse;

  @ManyToOne(() => Product, (product) => product.importDetailProductID)
  @JoinColumn({ name: 'productID' })
  productID: Product; // Định nghĩa mối quan hệ nhiều-một với Product
}
