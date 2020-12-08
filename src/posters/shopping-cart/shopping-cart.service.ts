import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Poster, PosterDocument } from 'src/schemas/poster.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShoppingCartService {
    constructor(@InjectModel(Poster.name) private posterModel: Model<PosterDocument>) {}

    async getAll(): Promise<Poster[]> {
        return this.posterModel.find({ isInShoppingCart: true }).exec();
    }
}
