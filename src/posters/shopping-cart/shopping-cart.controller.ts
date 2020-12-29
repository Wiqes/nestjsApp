import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './schemas/shopping-cart.schema';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/custom-decorators/get-user.decorator';

//import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shopping-cart')
//@UseGuards(JwtAuthGuard)
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get('get-all')
    getAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartService.getAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        return this.shoppingCartService.create(createShoppingCartDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('add/:posterId')
    addPoster(@Param('posterId') posterId: string, @GetUser() { username }): Promise<ShoppingCart> {
        return this.shoppingCartService.addPoster(posterId, username);
    }

    @UseGuards(JwtAuthGuard)
    @Put('remove/:posterId')
    removePoster(@Param('posterId') posterId: string, @GetUser() { username }): Promise<ShoppingCart> {
        return this.shoppingCartService.removePoster(posterId, username);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUserShoppingCart(@GetUser() { username }): Promise<any> {
        return this.shoppingCartService.getUserShoppingCart(username);
    }
}
