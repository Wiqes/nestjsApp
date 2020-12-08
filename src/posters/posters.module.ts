import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Poster, PosterSchema } from '../schemas/poster.schema';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Module({
    controllers: [PostersController, ShoppingCartController],
    providers: [PostersService, ShoppingCartService],
    imports: [MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }])],
})
export class PostersModule {}
