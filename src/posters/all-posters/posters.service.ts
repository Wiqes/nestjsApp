import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poster, PosterDocument } from 'src/posters/all-posters/schemas/poster.schema';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';

@Injectable()
export class PostersService {
    constructor(@InjectModel(Poster.name) private posterModel: Model<PosterDocument>) {}

    async getAll(): Promise<Poster[]> {
        return this.posterModel.find().sort({ _id: 'desc' }).exec();
    }

    async getById(id: string): Promise<Poster> {
        try {
            return this.posterModel.findById(id);
        } catch (e) {
            throw new NotFoundException(`The poster with id: '${id}' has not been found!`);
        }
    }

    async create(posterDto: CreatePosterDto): Promise<Poster> {
        const newPoster = new this.posterModel(posterDto);
        return newPoster.save();
    }

    async remove(id: string): Promise<Poster> {
        return this.posterModel.findByIdAndRemove(id);
    }

    async update(id: string, posterDto: UpdatePosterDto): Promise<Poster> {
        return this.posterModel.findByIdAndUpdate(id, posterDto, { new: true });
    }
}
