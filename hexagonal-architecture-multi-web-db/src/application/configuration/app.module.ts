import { Module } from '@nestjs/common';
import { HeroesModule } from './heroes.module';
import { ItemsModule } from './item/item.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HeroesModule,
    MongooseModule.forRoot(
      'mongodb://admin:admin@localhost:27017/superHeroes?authSource=admin',
    ),
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
