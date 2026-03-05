import { Controller, Inject } from '@nestjs/common';
import type { UUID } from 'node:crypto';
import type {
  GetSuperheroUseCasePort,
  ListSuperheroesUseCasePort,
} from '@domain/ports/in/commands';
import { SuperHeroesApiSpecControllerBase } from './generated/super-heroes.api.spec/super-heroes.api.spec.controller.base';
import { HeroDto } from './generated/super-heroes.api.spec/super-heroes.api.spec.dto';
import { SuperHeroDto } from './dto/SuperHeroDto';

@Controller('/')
export class SuperHeroController extends SuperHeroesApiSpecControllerBase {
  constructor(
    @Inject('ListSuperheroesUseCasePort')
    private readonly listSuperheroesUseCasePort: ListSuperheroesUseCasePort,
    @Inject('GetSuperheroUseCasePort')
    private readonly getSuperheroUseCasePort: GetSuperheroUseCasePort,
  ) {
    super();
  }

  async getAllSuperHeroes(): Promise<HeroDto[]> {
    return this.listSuperheroesUseCasePort
      .execute()
      .then((superHeroes) =>
        superHeroes.map((superHero) => SuperHeroDto.fromDomain(superHero)),
      );
  }

  getSuperHeroInformations(heroId: string): Promise<HeroDto> {
    return this.getSuperheroUseCasePort
      .execute(heroId as unknown as UUID)
      .then((superHero) => SuperHeroDto.fromDomain(superHero));
  }
}
