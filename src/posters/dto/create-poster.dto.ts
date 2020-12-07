export class CreatePosterDto {
    readonly title: string;
    readonly photo: string;
    readonly isInShoppingCart: boolean;
    readonly sellerName: string;
    readonly price: number;
    readonly description: string;
}
