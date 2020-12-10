import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { PostersModule } from './posters/posters.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb+srv://wiqes:qwerty312@cluster0.lejcg.mongodb.net/olrx?retryWrites=true&w=majority`,
            { useFindAndModify: false },
        ),
        FilesModule,
        PostersModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
