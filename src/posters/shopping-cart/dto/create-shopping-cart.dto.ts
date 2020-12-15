import { IsNotEmpty } from 'class-validator';

export class CreateShoppingCartDto {
    @IsNotEmpty()
    readonly username: string;

    posters: string[];
}
