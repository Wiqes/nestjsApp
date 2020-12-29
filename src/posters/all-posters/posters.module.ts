import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Poster, PosterSchema } from './schemas/poster.schema';
import { ShoppingCart, ShoppingCartSchema } from '../shopping-cart/schemas/shopping-cart.schema';

@Module({
    controllers: [PostersController],
    providers: [PostersService],
    imports: [
        MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }]),
        MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
    ],
    exports: [PostersService, MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }])],
})
export class PostersModule {}
