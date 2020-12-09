import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePosterDto {
    @IsNotEmpty()
    readonly title: string;

    readonly photo: string;

    readonly isInShoppingCart: boolean;

    @IsNotEmpty()
    readonly sellerName: string;

    @IsNotEmpty()
    @IsPositive()
    readonly price: number;

    readonly description: string;
}
