import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart, ShoppingCartDocument } from './schemas/shopping-cart.schema';

@Injectable()
export class ShoppingCartService {
    constructor(@InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCartDocument>) {}

    async getAll(): Promise<ShoppingCart[]> {
        // return this.shoppingCartModel.find({ isInShoppingCart: true }).exec();
        return this.shoppingCartModel.find().exec();
    }

    async create(shoppingCartDto: CreateShoppingCartDto): Promise<any> {
        return this.shoppingCartModel.findOne({ username: 'john' }, function (err, foundCompany) {
            if (err) {
                console.log(err);
            }

            foundCompany.posters.push('5fce5c3536a7c37695ce0ced');
            foundCompany.save();
        });
    }
}
