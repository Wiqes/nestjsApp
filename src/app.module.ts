import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { PostersModule } from './posters/all-posters/posters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShoppingCartModule } from './posters/shopping-cart/shopping-cart.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb+srv://wiqes:qwerty312@cluster0.lejcg.mongodb.net/olrx?retryWrites=true&w=majority`,
            { useFindAndModify: false, useCreateIndex: true },
        ),
        FilesModule,
        PostersModule,
        ShoppingCartModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
