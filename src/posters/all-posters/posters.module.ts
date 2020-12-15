import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Poster, PosterSchema } from './schemas/poster.schema';
import { ShoppingCartController } from '../shopping-cart/shopping-cart.controller';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart, ShoppingCartSchema } from '../shopping-cart/schemas/shopping-cart.schema';

@Module({
    controllers: [PostersController, ShoppingCartController],
    providers: [PostersService, ShoppingCartService],
    imports: [
        MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }]),
        MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
    ],
})
export class PostersModule {}
