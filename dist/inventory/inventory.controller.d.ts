import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(createInventoryDto: CreateInventoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInventoryDto: UpdateInventoryDto): string;
    remove(id: string): string;
}
