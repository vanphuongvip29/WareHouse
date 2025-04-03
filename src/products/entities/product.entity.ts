import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productName: string;

  @Column()
  description: string;

  @Column()
  unit: string;

  @Column()
  importPrice: number;

  @Column()
  salePrice: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}
