import { Module } from '@nestjs/common';
import { PostersController } from './posters.controller';
import { PostersService } from './posters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Poster, PosterSchema } from '../schemas/poster.schema';

@Module({
    controllers: [PostersController],
    providers: [PostersService],
    imports: [MongooseModule.forFeature([{ name: Poster.name, schema: PosterSchema }])],
})
export class PostersModule {}
