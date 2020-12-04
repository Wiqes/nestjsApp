import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forRoot(
            `mongodb+srv://wiqes:qwerty312@cluster0.lejcg.mongodb.net/products?retryWrites=true&w=majority`,
        ),
        MulterModule.register({
            dest: './files',
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
