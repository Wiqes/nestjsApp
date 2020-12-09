import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';

@Controller('files')
export class FilesController {
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        return {
            originalName: file.originalname,
            fileName: file.filename,
        };
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
                originalName: file.originalname,
                fileName: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Get(':imgPath')
    seeUploadedFile(@Param('imgPath') image, @Res() res) {
        return res.sendFile(image, { root: './files' });
    }

    @Delete(':img')
    remove(@Param('img') image: string): void {
        const path = `./files/${image}`;

        try {
            unlinkSync(path);
            //file removed
        } catch (err) {
            console.error(err);
        }
    }
}
