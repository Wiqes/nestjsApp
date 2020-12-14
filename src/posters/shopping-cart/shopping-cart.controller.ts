import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    // @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartService.getAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createShoppingCartDto: CreateShoppingCartDto): Promise<any> {
        return this.shoppingCartService.create(createShoppingCartDto);
    }
}
