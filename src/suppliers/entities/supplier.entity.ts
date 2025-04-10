import { Importwarehouse } from 'src/importwarehouse/entities/importwarehouse.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  supplierID: number;

  @Column()
  supplierName: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @OneToMany(() => Product, (product) => product.supplierID)
  productID: Product[];

  @OneToMany(
    () => Importwarehouse,
    (importwarehouse) => importwarehouse.supplierID,
  )
  importwarehouseID: Importwarehouse[];
}
