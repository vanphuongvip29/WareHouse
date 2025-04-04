import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryID: number;

  @Column({ unique: true })
  categoryName: string;

  @OneToMany(() => Product, (product) => product.categoryID)
  productID: Product[];
}
