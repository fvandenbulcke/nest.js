import { Module } from '@nestjs/common';
import { SuperHeroController } from '../web/heroes.controller';
import { SuperheroRepository } from '@domain/ports/out/superheroRepository';
import { ListSuperheroesUseCase } from '@domain/usecases/listSuperheroesUseCase';
import { GetSuperheroUseCase } from '@domain/usecases/getSuperheroUseCase';
import { DatabaseModule } from './database.module';

const repositoryName = 'SuperheroRepository';

@Module({
  imports: [DatabaseModule.forRoot(repositoryName)],
  controllers: [SuperHeroController],
  providers: [
    {
      provide: 'ListSuperheroesUseCasePort',
      useFactory: (superheroRepository: SuperheroRepository) => {
        return new ListSuperheroesUseCase(superheroRepository);
      },
      inject: [repositoryName],
    },
    {
      provide: 'GetSuperheroUseCasePort',
      useFactory: (superheroRepository: SuperheroRepository) => {
        return new GetSuperheroUseCase(superheroRepository);
      },
      inject: [repositoryName],
    },
  ],
})
export class HeroesModule {}
