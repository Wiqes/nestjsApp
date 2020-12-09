import { IsBoolean } from 'class-validator';

export class UpdatePosterDto {
    readonly title: string;

    readonly photo: string;

    @IsBoolean()
    readonly isInShoppingCart: boolean;

    readonly sellerName: string;

    readonly price: number;

    readonly description: string;
}
