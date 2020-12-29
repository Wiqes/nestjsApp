import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { PostersModule } from '../all-posters/posters.module';
import { ShoppingCartController } from './shopping-cart.controller';
import { PostersService } from '../all-posters/posters.service';

@Module({
    providers: [ShoppingCartService, PostersService],
    controllers: [ShoppingCartController],
    imports: [MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]), PostersModule],
    exports: [
        ShoppingCartService,
        MongooseModule.forFeature([{ name: ShoppingCart.name, schema: ShoppingCartSchema }]),
        PostersModule,
    ],
})
export class ShoppingCartModule {}
