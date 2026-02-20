import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SuperHeroDocument,
  SuperHeroSchema,
} from '@/infrastructure/ports/mongoDb/super.hero.schema';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SuperHeroDocument.name, schema: SuperHeroSchema },
    ]),
  ],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
