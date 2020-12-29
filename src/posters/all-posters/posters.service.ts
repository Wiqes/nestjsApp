import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poster, PosterDocument } from 'src/posters/all-posters/schemas/poster.schema';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable()
export class PostersService {
    constructor(
        @InjectModel(Poster.name) private posterModel: Model<PosterDocument>, //@Inject(forwardRef(() => ShoppingCartService)) private shoppingCartService: ShoppingCartService,
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

    async create(posterDto: CreatePosterDto): Promise<Poster> {
        const newPoster = new this.posterModel(posterDto);
        return newPoster.save();
    }

    async remove(id: string): Promise<Poster> {
        try {
            const found = await this.posterModel.findByIdAndRemove(id);
            if (!found) {
                throw 'NotFound';
            }
            return found;
        } catch (e) {
            throw PostersService.notFoundException(id);
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
}
