import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  category: string;

  @Prop()
  descrition: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
