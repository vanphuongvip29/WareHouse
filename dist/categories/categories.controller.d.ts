import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request } from 'express';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<CreateCategoryDto & import("./entities/category.entity").Category>;
    findAll(req: Request): Promise<{
        data: import("./entities/category.entity").Category[];
        total: number;
        page: number;
        last_page: number;
    }>;
    findOne(id: number): Promise<import("./entities/category.entity").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("./entities/category.entity").Category>;
    remove(id: string): Promise<{
        status: import("@nestjs/common").HttpStatus;
        '\u0111\u00E3 x\u00F3a th\u00E0nh c\u00F4ng': import("./entities/category.entity").Category;
    }>;
}
