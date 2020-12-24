import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { GetUser } from './custom-decorators/get-user.decorator';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    getHello(): string {
        return 'Hello NestJS!';
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@GetUser() user) {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@GetUser() user) {
        return user;
    }
}
