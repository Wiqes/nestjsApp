import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poster, PosterDocument } from 'src/posters/all-posters/schemas/poster.schema';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { ShoppingCart, ShoppingCartDocument } from '../shopping-cart/schemas/shopping-cart.schema';

@Injectable()
export class PostersService {
    constructor(
        @InjectModel(Poster.name) private posterModel: Model<PosterDocument>,
        @InjectModel(ShoppingCart.name) private shoppingCartModel: Model<ShoppingCartDocument>,
    ) {}

    private static notFoundException(id: string): NotFoundException {
        return new NotFoundException(`The poster with id: '${id}' has not been found!`);
    }

    async getAll(): Promise<Poster[]> {
        return this.posterModel.find().sort({ _id: 'desc' }).exec();
    }

    async getById(id: string): Promise<Poster> {
        try {
            const found = await this.posterModel.findById(id);
            if (!found) {
                throw 'NotFound';
            }
            return found;
        } catch (e) {
            throw PostersService.notFoundException(id);
        }
    }

    async create(posterDto: CreatePosterDto, username: string): Promise<Poster> {
        const newPoster = new this.posterModel({ ...posterDto, creator: username });
        return newPoster.save();
    }

    async remove(posterId: string, username: string): Promise<Poster> {
        try {
            const foundPoster = await this.posterModel.findById(posterId);
            if (!foundPoster) {
                throw 'NotFound';
            }
            if (foundPoster.creator !== username) {
                throw new HttpException('403', HttpStatus.FORBIDDEN);
            }

            const removedPoster = await this.posterModel.findByIdAndRemove(posterId);

            if (foundPoster.buyer) {
                const foundShoppingCart = await this.shoppingCartModel.findOne({ username: foundPoster.buyer });
                foundShoppingCart.posters = foundShoppingCart.posters.filter((currentPosterId) => {
                    return String(currentPosterId) !== posterId;
                });
                foundShoppingCart.save();
            }

            return removedPoster;
        } catch (e) {
            if (e.message === '403') {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            } else {
                throw PostersService.notFoundException(posterId);
            }
        }
    }

    async update(id: string, posterDto: UpdatePosterDto): Promise<Poster> {
        try {
            const updatedPoster = await this.posterModel.findByIdAndUpdate(id, posterDto, { new: true });
            if (!updatedPoster) {
                throw 'NotFound';
            }
            return updatedPoster;
        } catch (e) {
            throw PostersService.notFoundException(id);
        }
    }

    async updateBuyerValue(posterId: string, buyer: string): Promise<Poster> {
        try {
            const foundPoster = await this.posterModel.findById(posterId);
            if (!foundPoster) {
                throw 'NotFound';
            }
            foundPoster.buyer = buyer;
            return foundPoster.save();
        } catch (e) {
            throw PostersService.notFoundException(posterId);
        }
    }

    async removeShoppingCartFlag(posterId: string): Promise<Poster> {
        try {
            const foundPoster = await this.posterModel.findById(posterId);
            if (!foundPoster) {
                throw 'NotFound';
            }
            foundPoster.isInShoppingCart = false;
            return foundPoster.save();
        } catch (e) {
            throw PostersService.notFoundException(posterId);
        }
    }

    async addShoppingCartFlag(posterId: string): Promise<Poster> {
        try {
            const foundPoster = await this.posterModel.findById(posterId);
            if (!foundPoster) {
                throw 'NotFound';
            }
            foundPoster.isInShoppingCart = true;
            return foundPoster.save();
        } catch (e) {
            throw PostersService.notFoundException(posterId);
        }
    }

    async getPostersById(idArray: Array<string>): Promise<Poster[]> {
        try {
            const foundPosters = await this.posterModel
                .find({ _id: { $in: idArray } })
                .sort({ _id: 'desc' })
                .exec();
            if (!foundPosters) {
                throw 'NotFound';
            }
            return foundPosters;
        } catch (e) {
            throw PostersService.notFoundException(JSON.stringify(idArray));
        }
    }

    async updateAll(): Promise<Poster[]> {
        try {
            const foundPosters = await this.posterModel.find().exec();
            if (!foundPosters) {
                throw 'NotFound';
            }

            const newPosters: Poster[] = [];

            for (const poster of foundPosters) {
                const foundPoster = await this.posterModel.findByIdAndUpdate(poster._id, { poster }, { new: true });

                newPosters.push(foundPoster);
            }

            return newPosters;
        } catch (e) {
            throw PostersService.notFoundException(JSON.stringify('any_id'));
        }
    }
}
