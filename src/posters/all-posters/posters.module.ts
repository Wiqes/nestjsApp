import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Poster, PosterSchema } from './schemas/poster.schema';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCartModule } from '../shopping-cart/shopping-cart.module';

@Module({
    controllers: [PostersController /*ShoppingCartService*/],
    providers: [PostersService],
    imports: [MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }]) /*ShoppingCartModule*/],
    exports: [PostersService, MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }])],
})
export class PostersModule {}
