import {
  BadGatewayException,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoriesService,
  ) {}

  // trả về true nếu categoryName đã tồn tại và false ngược lại.
  async checkNameProExists(name: string): Promise<boolean> {
    return this.productRepository.exists({ where: { productName: name } });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    //check name
    const isNameExist = await this.checkNameProExists(
      createProductDto.productName,
    );

    if (isNameExist) {
      throw new BadRequestException(
        `Category Name đã tồn tại: ${createProductDto.productName}`,
      );
    }

    const categoryId = await this.categoryService.findOne(
      +createProductDto.categoryID,
    );

    // Tạo đối tượng Product
    const createProduct = this.productRepository.create({
      ...createProductDto,
      categoryID: categoryId,
    });

    return this.productRepository.save(createProduct);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findID(id: number) {
    const findPro = await this.productRepository.findOne({
      where: { productID: id },
      relations: ['category'],
    });

    if (!findPro) {
      throw new BadGatewayException('không tìm thấy product id');
    }

    return findPro;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const findProId = await this.findID(id);

    if (!findProId) {
      throw new BadRequestException('không tìm thấy product ID ');
    }

    const isNameExist = await this.checkNameProExists(
      updateProductDto.productName,
    );

    if (isNameExist) {
      throw new BadRequestException(
        `Product Name đã tồn tại bạn vui lòng cập nhật tên khác: ${updateProductDto.productName}`,
      );
    }

    //cate

    let cateID = findProId.categoryID; // Giữ nguyên category hiện tại nếu không có categoryID mới

    // Kiểm tra nếu categoryID được cung cấp
    if (updateProductDto.categoryID) {
      cateID = await this.categoryService.findOne(+updateProductDto.categoryID);

      if (!cateID) {
        throw new BadRequestException(
          `Category with ID ${updateProductDto.categoryID} does not exist`,
        );
      }
    }

    console.log('findPro:', findProId);
    console.log('Category:', cateID);

    // Tạo đối tượng Product
    const createProduct = this.productRepository.create({
      ...findProId,
      productName: updateProductDto.productName,
      description: updateProductDto.description,
      unit: updateProductDto.unit,
      importPrice: updateProductDto.importPrice,
      salePrice: updateProductDto.salePrice,
      categoryID: cateID,
    });

    return this.productRepository.save(createProduct);
  }

  async remove(id: number) {
    const pro = await this.findID(id);
    if (!pro) {
      throw new BadRequestException(` Cate with ID ${id} not found`);
    }
    const result = await this.productRepository.remove(pro);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
