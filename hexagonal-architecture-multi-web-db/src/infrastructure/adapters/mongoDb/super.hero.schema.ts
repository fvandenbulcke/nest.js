import { SuperHero } from '@domain/models/superHero';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type { UUID } from 'node:crypto';

@Schema({ collection: 'superHeroes' })
export class SuperHeroDocument extends Document {
  @Prop({ required: true })
  id: UUID;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  toDomain: () => SuperHero;
}

export const SuperHeroSchema = SchemaFactory.createForClass(SuperHeroDocument);

SuperHeroSchema.methods.toDomain = function (
  this: SuperHeroDocument,
): SuperHero {
  return new SuperHero(this._id as any, this.name, new Set());
};
