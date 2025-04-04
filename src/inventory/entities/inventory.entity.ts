import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryColumn()
  productID: number;

  @Column()
  quantity: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'productID' })
  product: Product;
}
