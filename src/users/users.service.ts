import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ShoppingCartService } from '../posters/shopping-cart/shopping-cart.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly shoppingCartService: ShoppingCartService,
    ) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const foundUser = await this.userModel.findOne({ username: userDto.username }).exec();
        if (foundUser) {
            throw new ConflictException('Username already exists');
        }
        const newUser = await new this.userModel(userDto);
        await this.shoppingCartService.create({ username: userDto.username, posters: [] });
        return newUser.save();
    }

    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username: username }).exec();
    }
}
