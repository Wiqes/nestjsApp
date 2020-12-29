import { IsNotEmpty, IsPositive } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreatePosterDto {
    @IsNotEmpty()
    readonly title: string;

    readonly photo: string;

    @Optional()
    readonly creator: string;

    @Optional()
    readonly buyer: string;

    readonly isInShoppingCart: boolean;

    @IsNotEmpty()
    readonly sellerName: string;

    @IsNotEmpty()
    @IsPositive()
    readonly price: number;

    readonly description: string;
}
