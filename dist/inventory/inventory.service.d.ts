import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryService {
    create(createInventoryDto: CreateInventoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInventoryDto: UpdateInventoryDto): string;
    remove(id: number): string;
}
