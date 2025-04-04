import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // trả về true nếu categoryName đã tồn tại và false ngược lại.
  async checkNameCateExists(name: string): Promise<boolean> {
    return this.categoryRepository.exists({ where: { categoryName: name } });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;
    //check name
    const isNameExist = await this.checkNameCateExists(categoryName);

    if (isNameExist) {
      throw new BadRequestException(
        `Category Name đã tồn tại: ${createCategoryDto.categoryName}`,
      );
    }

    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    const cate = await this.categoryRepository.find();
    return cate;
  }

  async findOne(id: number) {
    const findCate = await this.categoryRepository.findOne({
      where: { categoryID: id },
      relations: ['products'],
    });

    if (!findCate) throw new BadGatewayException('không tìm thấy category id');

    return findCate;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const findCate = await this.categoryRepository.findOne({
      where: { categoryID: id },
    });

    if (!findCate) {
      throw new BadRequestException('không tìm thấy category ');
    }

    //check name
    const { categoryName } = updateCategoryDto;
    const isNameExist = await this.checkNameCateExists(categoryName);

    if (isNameExist) {
      throw new BadRequestException(
        `Category Name đã tồn tại bạn vui lòng cập nhật tên khác: ${updateCategoryDto.categoryName}`,
      );
    }

    const createCate = await this.categoryRepository.create({
      ...findCate,
      categoryName: updateCategoryDto.categoryName,
    });

    const updateCate = await this.categoryRepository.save(createCate);
    return updateCate;
  }

  async remove(id: number) {
    const cate = await this.categoryRepository.findOneBy({ categoryID: id });
    if (!cate) {
      throw new BadRequestException(` Cate with ID ${id} not found`);
    }
    const result = await this.categoryRepository.remove(cate);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
