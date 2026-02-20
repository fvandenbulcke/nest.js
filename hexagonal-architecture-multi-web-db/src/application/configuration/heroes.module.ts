import { Module } from '@nestjs/common';
import { SuperHeroController } from '../web/heroes.controller';
import { getSuperheroUseCase, listSuperheroesUseCase } from './beans';

@Module({
  imports: [],
  controllers: [SuperHeroController],
  providers: [
    {
      provide: 'ListSuperheroesUseCasePort',
      useValue: listSuperheroesUseCase,
    },
    {
      provide: 'GetSuperheroUseCasePort',
      useValue: getSuperheroUseCase,
    },
  ],
})
export class HeroesModule {}
