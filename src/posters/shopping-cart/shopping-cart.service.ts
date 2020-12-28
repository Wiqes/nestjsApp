import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart, ShoppingCartDocument } from './schemas/shopping-cart.schema';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Poster, PosterDocument } from '../all-posters/schemas/poster.schema';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCartDocument>,
        @InjectModel(Poster.name) private posterModel: Model<PosterDocument>,
    ) {}

    async getAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartModel.find().exec();
    }

    async create(shoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const newShoppingCart = new this.shoppingCartModel(shoppingCartDto);
        return newShoppingCart.save();
    }

    async shiftPoster(action: string, shoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
        const foundCompany = await this.shoppingCartModel.findOne({ username: shoppingCartDto.username });

        if (action === 'add') {
            foundCompany.posters.push(shoppingCartDto.posterId);
        } else if (action === 'remove') {
            foundCompany.posters = foundCompany.posters.filter((posterId) => {
                return String(posterId) !== shoppingCartDto.posterId;
            });
        }
        return foundCompany.save();
    }

    async getUserShoppingCart(username: string): Promise<any> {
        const shoppingCart = await this.shoppingCartModel.findOne({ username });
        return this.posterModel
            .find({ _id: { $in: shoppingCart.posters } })
            .sort({ _id: 'desc' })
            .exec();
    }
}
