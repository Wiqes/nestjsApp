import { Controller, Get } from '@nestjs/common';
import { Poster } from 'src/schemas/poster.schema';
import { ShoppingCartService } from './shopping-cart.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get()
    getAll(): Promise<Poster[]> {
        return this.shoppingCartService.getAll();
    }
}
