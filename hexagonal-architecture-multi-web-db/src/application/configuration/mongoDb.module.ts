import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SuperHeroDocument,
  SuperHeroSchema,
} from '@/infrastructure/ports/mongoDb/super.hero.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_CONNEXION}?authSource=admin`,
    ),
    MongooseModule.forFeature([
      { name: SuperHeroDocument.name, schema: SuperHeroSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
