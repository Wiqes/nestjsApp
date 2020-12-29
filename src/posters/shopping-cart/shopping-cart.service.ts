import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart, ShoppingCartDocument } from './schemas/shopping-cart.schema';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { PostersService } from '../all-posters/posters.service';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCartDocument>,
        private postersService: PostersService,
    ) {}

    async getAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartModel.find().exec();
    }

    async create(shoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const newShoppingCart = new this.shoppingCartModel(shoppingCartDto);
        return newShoppingCart.save();
    }

    async shiftPoster(action: string, shoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
        const foundShoppingCart = await this.shoppingCartModel.findOne({ username: shoppingCartDto.username });

        if (action === 'add') {
            foundShoppingCart.posters.push(shoppingCartDto.posterId);
        } else if (action === 'remove') {
            foundShoppingCart.posters = foundShoppingCart.posters.filter((posterId) => {
                return String(posterId) !== shoppingCartDto.posterId;
            });
        }
        return foundShoppingCart.save();
    }

    async getUserShoppingCart(username: string): Promise<any> {
        const shoppingCart = await this.shoppingCartModel.findOne({ username });
        return this.postersService.getPostersById(shoppingCart.posters);
    }
}
