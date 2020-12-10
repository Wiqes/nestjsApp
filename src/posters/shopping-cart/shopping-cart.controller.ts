import { Controller, Get, UseGuards } from '@nestjs/common';
import { Poster } from 'src/schemas/poster.schema';
import { ShoppingCartService } from './shopping-cart.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): Promise<Poster[]> {
        return this.shoppingCartService.getAll();
    }
}
