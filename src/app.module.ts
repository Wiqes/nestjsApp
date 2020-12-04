import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forRoot(
            `mongodb+srv://wiqes:qwerty312@cluster0.lejcg.mongodb.net/products?retryWrites=true&w=majority`,
        ),
        FilesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
