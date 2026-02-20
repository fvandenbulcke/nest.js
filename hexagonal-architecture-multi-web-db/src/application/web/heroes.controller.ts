import { Controller, Get, Inject, Param } from '@nestjs/common';
import type { UUID } from 'node:crypto';
import { SuperHero } from '@domain/models/superHero';
import type {
  GetSuperheroUseCasePort,
  ListSuperheroesUseCasePort,
} from '@domain/ports/in/commands';
import { SuperHeroesApiSpecControllerBase } from './generated/super-heroes.api.spec/super-heroes.api.spec.controller.base';
import { HeroDto } from './generated/super-heroes.api.spec/super-heroes.api.spec.dto';

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

  //@Get()
  async getAllSuperHeroes(): Promise<SuperHero[]> {
    return this.listSuperheroesUseCasePort.execute();
  }

  /* @Get(':id')
  async getSuperHeroById(
    @Param() params: { id: UUID },
  ): Promise<SuperHero | undefined> {
    return this.getSuperheroUseCasePort.execute(params.id);
  } */

  getSuperHeroInformations(heroId: string): Promise<HeroDto> {
    return this.getSuperheroUseCasePort
      .execute(heroId as unknown as UUID)
      .then((superHero) => {
        const response = new HeroDto();
        response.id = superHero.getId();
        response.name = superHero.getName();
        response.powers = Array.from(superHero.getPowers());
        return response;
      });
  }
}
