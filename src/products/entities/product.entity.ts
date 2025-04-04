import { Category } from 'src/categories/entities/category.entity';
import { ExportDetailWarehouse } from 'src/exportdetailwarehouse/entities/exportdetailwarehouse.entity';
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
export class Product {
  @PrimaryGeneratedColumn()
  productID: number;

  @Column({ unique: true })
  productName: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  unit: string;

  @Column()
  importPrice: number;

  @Column()
  salePrice: number;

  @ManyToOne(() => Category, (category) => category.productID)
  @JoinColumn({ name: 'categoryID' })
  categoryID: Category;

  @ManyToOne(() => Supplier, (supplier) => supplier.productID)
  @JoinColumn({ name: 'supplierID' })
  supplierID: Supplier;

  @OneToMany(
    () => Importdetailwarehosue,
    (importDetailProduct) => importDetailProduct.productID,
  )
  importDetailProduct: Importdetailwarehosue[]; // Định nghĩa mối quan hệ một-nhiều với ImportDetail

  @OneToMany(
    () => ExportDetailWarehouse,
    (exportDetailWarehouse) => exportDetailWarehouse.productID,
  )
  exportDetails: ExportDetailWarehouse[]; // Định nghĩa mối quan hệ một-nhiều với ExportDetail
}
