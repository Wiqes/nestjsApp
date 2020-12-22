import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ShoppingCartService } from '../posters/shopping-cart/shopping-cart.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly shoppingCartService: ShoppingCartService,
    ) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const newUser = await new this.userModel(userDto);
        await this.shoppingCartService.create({ username: userDto.username, posters: [] });
        return newUser.save();
    }

    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username: username }).exec();
    }
}
