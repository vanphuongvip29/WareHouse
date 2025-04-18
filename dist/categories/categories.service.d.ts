import { HttpStatus } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    checkNameCateExists(name: string): Promise<boolean>;
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & Category>;
    findAll(): Promise<Category[]>;
    queryBuilder(alias: string): Promise<import("typeorm").SelectQueryBuilder<Category>>;
    findID(id: number): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<{
        status: HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': Category;
    }>;
}
