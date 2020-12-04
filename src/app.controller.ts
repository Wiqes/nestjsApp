import { Controller, Get, Post, UseInterceptors, UploadedFile, UploadedFiles, Res, Param } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';

@Controller()
export class AppController {
    /* @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )*/
    @Post()
    @UseInterceptors(AnyFilesInterceptor())
    async uploadedFile(@UploadedFile() file) {
        /* const response = {
            originalname: file.originalname,
            filename: file.filename,
        };*/
        return file;
    }

    @Post('multiple')
    @UseInterceptors(
        FilesInterceptor('image', 20, {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach((file) => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get()
    getHello(): string {
        return 'Hello NestJS!';
    }

    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }
}
