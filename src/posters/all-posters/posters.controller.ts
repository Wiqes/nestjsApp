import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Poster } from 'src/posters/all-posters/schemas/poster.schema';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { PostersService } from './posters.service';

@Controller('posters')
export class PostersController {
    constructor(private readonly postersService: PostersService) {}

    @Get()
    getAll(): Promise<Poster[]> {
        return this.postersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Poster> {
        return this.postersService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPosterDto: CreatePosterDto): Promise<Poster> {
        return this.postersService.create(createPosterDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Poster> {
        return this.postersService.remove(id);
    }

    @Put(':id')
    update(@Body() updatePosterDto: UpdatePosterDto, @Param('id') id: string): Promise<Poster> {
        return this.postersService.update(id, updatePosterDto);
    }
}
