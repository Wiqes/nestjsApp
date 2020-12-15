import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';

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
    create(@Body() createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        return this.shoppingCartService.create(createShoppingCartDto);
    }

    @Put(':userId')
    addPoster(
        @Body() updateShoppingCartDto: UpdateShoppingCartDto,
        @Param('userId') userId: string,
    ): Promise<ShoppingCart> {
        return this.shoppingCartService.addPoster(userId, updateShoppingCartDto);
    }

    @Get(':userId')
    getUserShoppingCart(@Param('userId') userId: string): Promise<any> {
        return this.shoppingCartService.getUserShoppingCart(userId);
    }
}
