import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poster, PosterDocument } from 'src/schemas/poster.schema';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';

@Injectable()
export class PostersService {
    constructor(@InjectModel(Poster.name) private posterModel: Model<PosterDocument>) {}

    async getAll(): Promise<Poster[]> {
        return this.posterModel.find().exec();
    }

    async getById(id: string): Promise<Poster> {
        return this.posterModel.findById(id);
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
