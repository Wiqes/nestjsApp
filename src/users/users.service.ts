import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
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
        const salt = await bcrypt.genSalt();
        const password = await UsersService.hashPassword(userDto.password, salt);
        const newUser = await new this.userModel({ ...userDto, password, salt });
        await this.shoppingCartService.create({ username: userDto.username, posters: [] });
        return newUser.save();
    }

    private static async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({ username: username }).exec();
    }
}
