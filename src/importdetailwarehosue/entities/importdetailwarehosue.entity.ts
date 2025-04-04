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
  ImportDetailID: number;

  @Column()
  quantity: number;

  @Column()
  importPrice: number;

  @ManyToOne(
    () => Importwarehouse,
    (importWarehouse) => importWarehouse.importDetailWarehosue,
  )
  @JoinColumn({ name: 'importID' })
  importID: Importwarehouse;

  @ManyToOne(() => Product, (product) => product.importDetailProduct)
  @JoinColumn({ name: 'productID' })
  productID: Product; // Định nghĩa mối quan hệ nhiều-một với Product
}
