import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart, ShoppingCartDocument } from './schemas/shopping-cart.schema';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
    constructor(@InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCartDocument>) {}

    async getAll(): Promise<ShoppingCart[]> {
        return this.shoppingCartModel.find().exec();
    }

    async create(shoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const newShoppingCart = new this.shoppingCartModel(shoppingCartDto);
        return newShoppingCart.save();
    }

    async addPoster(userId: string, shoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
        return this.shoppingCartModel.findOne({ username: userId }, function (err, foundCompany) {
            if (err) {
                console.log(err);
            }

            foundCompany.posters.push(shoppingCartDto.posterId);
            foundCompany.save();
        });
    }
}
