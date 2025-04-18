import { HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';
export declare class ProductsService {
    private productRepository;
    private categoryService;
    private supplierService;
    constructor(productRepository: Repository<Product>, categoryService: CategoriesService, supplierService: SuppliersService);
    checkNameProExists(name: string): Promise<boolean>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findID(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<{
        status: HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': Product;
    }>;
}
