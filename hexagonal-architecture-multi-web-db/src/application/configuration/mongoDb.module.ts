import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SuperHeroDocument,
  SuperHeroSchema,
} from '@/infrastructure/ports/mongoDb/super.hero.schema';
import { MongoDbSuperheroRepository } from '@/infrastructure/ports/mongoDb/mongoDbSuperheroRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuperHeroDocument.name, schema: SuperHeroSchema },
    ]),
  ],
  providers: [MongoDbSuperheroRepository],
  exports: [MongoDbSuperheroRepository],
})
export class MongoDbModule {}
