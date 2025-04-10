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
import { SuppliersService } from 'src/suppliers/suppliers.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoriesService,
    private supplierService: SuppliersService,
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
        `tên sản phẩm đã tồn tại: ${createProductDto.productName}`,
      );
    }

    const categoryId = await this.categoryService.findID(
      +createProductDto.categoryID,
    );

    const supplierId = await this.supplierService.findID(
      +createProductDto.supplierID,
    );

    // Tạo đối tượng Product
    const createProduct = this.productRepository.create({
      ...createProductDto,
      categoryID: categoryId,
      supplierID: supplierId,
    });

    return this.productRepository.save(createProduct);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findID(id: number) {
    const findPro = await this.productRepository.findOne({
      where: { productID: id },
      relations: ['categoryID'],
    });

    if (!findPro) {
      throw new BadGatewayException('Không tìm thấy sản phẩm');
    }

    return findPro;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const findProId = await this.findID(id);

    if (
      updateProductDto.productName &&
      findProId.productName != updateProductDto.productName
    ) {
      const isNameExist = await this.checkNameProExists(
        updateProductDto.productName,
      );

      if (isNameExist) {
        throw new BadRequestException(
          `Tên sản phẩm đã tồn tại bạn vui lòng cập nhật tên khác: ${updateProductDto.productName}`,
        );
      }
    }

    //cate

    let cateID = findProId.categoryID; // Giữ nguyên category hiện tại nếu không có categoryID mới

    // Kiểm tra nếu categoryID được cung cấp
    if (updateProductDto.categoryID) {
      cateID = await this.categoryService.findID(+updateProductDto.categoryID);
    }

    let suppID = findProId.supplierID;
    if (updateProductDto.supplierID) {
      suppID = await this.supplierService.findID(+updateProductDto.supplierID);
    }

    // Tạo đối tượng Product
    const createProduct = this.productRepository.create({
      ...findProId,
      productName: updateProductDto.productName,
      description: updateProductDto.description,
      unit: updateProductDto.unit,
      importPrice: updateProductDto.importPrice,
      salePrice: updateProductDto.salePrice,
      categoryID: cateID,
      supplierID: suppID,
    });

    return this.productRepository.save(createProduct);
  }

  async remove(id: number) {
    const pro = await this.findID(id);
    const result = await this.productRepository.remove(pro);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }
}
