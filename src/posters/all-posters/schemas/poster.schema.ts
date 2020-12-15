import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PosterDocument = Poster & Document;

@Schema()
export class Poster {
    @Prop()
    title: string;

    @Prop()
    isInShoppingCart: boolean;

    @Prop()
    sellerName: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop()
    photo: string;
}

export const PosterSchema = SchemaFactory.createForClass(Poster);
