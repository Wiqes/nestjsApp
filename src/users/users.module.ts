import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { ShoppingCartService } from '../posters/shopping-cart/shopping-cart.service';
import { ShoppingCartModule } from '../posters/shopping-cart/shopping-cart.module';

@Module({
    providers: [UsersService, ShoppingCartService],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), ShoppingCartModule],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
