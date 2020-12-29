import { IsBoolean } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdatePosterDto {
    readonly title: string;

    readonly photo: string;

    @Optional()
    readonly buyer: string;

    @IsBoolean()
    readonly isInShoppingCart: boolean;

    readonly sellerName: string;

    readonly price: number;

    readonly description: string;
}
