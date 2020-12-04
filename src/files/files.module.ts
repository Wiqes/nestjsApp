import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    controllers: [FilesController],
    imports: [
        MulterModule.register({
            dest: './files',
        }),
    ],
})
export class FilesModule {}
