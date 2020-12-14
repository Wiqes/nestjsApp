import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
//import { Poster } from 'src/posters/all-posters/schemas/poster.schema';

export type ShoppingCartDocument = ShoppingCart & mongoose.Document;

@Schema()
export class ShoppingCart {
    @Prop()
    username: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poster' }] })
    posters: string[];
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
