import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'Password is too weak' })
    readonly password: string;

    @Optional()
    readonly salt: string;
}
