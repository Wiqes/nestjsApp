import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Poster } from 'src/posters/all-posters/schemas/poster.schema';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from './dto/update-poster.dto';
import { PostersService } from './posters.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetUser } from '../../custom-decorators/get-user.decorator';

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

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createPosterDto: CreatePosterDto): Promise<Poster> {
        return this.postersService.create(createPosterDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @GetUser() { username }): Promise<Poster> {
        return this.postersService.remove(id, username);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Body() updatePosterDto: UpdatePosterDto, @Param('id') id: string): Promise<Poster> {
        return this.postersService.update(id, updatePosterDto);
    }
}
