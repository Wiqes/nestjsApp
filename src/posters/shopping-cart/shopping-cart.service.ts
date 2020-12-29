import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { ShoppingCart, ShoppingCartDocument } from './schemas/shopping-cart.schema';
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

    async addPoster(posterId: string, username: string): Promise<ShoppingCart> {
        const foundShoppingCart = await this.shoppingCartModel.findOne({ username });
        foundShoppingCart.posters.push(posterId);
        await this.postersService.updateBuyerValue(posterId, username);
        await this.postersService.addShoppingCartFlag(posterId);

        return foundShoppingCart.save();
    }

    async removePoster(posterId: string, username: string): Promise<ShoppingCart> {
        const foundShoppingCart = await this.shoppingCartModel.findOne({ username });
        foundShoppingCart.posters = foundShoppingCart.posters.filter((currentPosterId) => {
            return String(currentPosterId) !== posterId;
        });
        await this.postersService.updateBuyerValue(posterId, '');
        await this.postersService.removeShoppingCartFlag(posterId);

        return foundShoppingCart.save();
    }

    async getUserShoppingCart(username: string): Promise<any> {
        const shoppingCart = await this.shoppingCartModel.findOne({ username });
        return this.postersService.getPostersById(shoppingCart.posters);
    }
}
